from fastapi import FastAPI,HTTPException,Depends,status
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import models
from datetime import date
from typing import  Annotated, Optional
from database import engine,SessionLocal
from sqlalchemy.orm import Session
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
models.Base.metadata.create_all(bind=engine)
class ProjectBase(BaseModel):
    project_name:str
    project_description: str
    start_date: date
    end_date: date
    project_owner_id:str
class UpdateProjectBase(BaseModel):
    project_name: Optional[str]=None
    project_description: Optional[str]=None
    start_date: Optional[date]=None
    end_date: Optional[date]=None
    project_owner_id:Optional[str]=None

class TaskBase(BaseModel):
    task_name: str
    task_description:str
    task_status :str
    task_owner_id: str
    due_date: date
    project_id: str

class UpdateTaskBase(BaseModel):
    task_name: Optional[str]=None
    task_description:Optional[str]=None
    task_status :Optional[str]=None
    task_owner_id: Optional[str]=None
    due_date: Optional[date]=None
    project_id: Optional[str]=None
class EmployeeBase(BaseModel):
    employee_id : str
    employee_name :str
    employee_email : str
class RoleBase(BaseModel):
    role_id:int
    role_name:str
class UserRoleBase(BaseModel):
    role_id:int
    project_id:str
    employee_id:str
class UpdateUserRoleBase(BaseModel):
    role_id:Optional[int]=None
    project_id:Optional[str]=None
    employee_id:Optional[str]=None
class AdminBase(BaseModel):
    employee_id:str
class AdminBase(BaseModel):
    employee_id:str
    
def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
db_dependency=Annotated[Session,Depends(get_db)]
@app.post("/create-project/",status_code=status.HTTP_201_CREATED)
async def create_project(project:ProjectBase,db: db_dependency):
    db_project=models.Project(**project.dict())
    db.add(db_project)
    db.commit()
@app.post("/create-task/",status_code=status.HTTP_201_CREATED)
async def create_task(task: TaskBase,db:db_dependency):
    db_task=models.Task(**task.dict())
    db.add(db_task)
    db.commit()
@app.get("/user",status_code=status.HTTP_200_OK)
async def get_user(db:db_dependency):
    users=db.query(models.Employee).all()
    if users is None:
        raise HTTPException(status_code=404,detail="No projects")
    return users
    

@app.post("/create-user/",status_code=status.HTTP_201_CREATED)
async def create_users(emp:EmployeeBase,db: db_dependency):
    db_emp=models.Employee(**emp.dict())
    db.add(db_emp)
    db.commit()


@app.get('/projects/{project_id}',status_code=status.HTTP_200_OK)
async def read_project(project_id:str, db:db_dependency):
    project=db.query(models.Project).filter(models.Project.project_id==project_id).first()
    if project is None:
        raise HTTPException(status_code=404,detail='Project not found')
    return project
@app.get('/user-role/{user_id}',status_code=status.HTTP_200_OK)
async def read_user_role(user_id:str, db:db_dependency):
    projects=db.query(models.UserRole).filter(models.UserRole.employee_id==user_id).all()
    if projects is None:
        raise HTTPException(status_code=404,detail='Projects not found')
    return projects
@app.get('/tasks/{task_id}',status_code=status.HTTP_200_OK)
async def read_task(task_id: str, db:db_dependency):
    task=db.query(models.Task).filter(models.Task.task_id==task_id).first()
    if task is None:
        raise HTTPException(status_code=404,detail="Task not found")
    return task
@app.delete('/tasks/{task_id}',status_code=status.HTTP_200_OK)
async def delete_task(task_id: str, db:db_dependency):
    task=db.query(models.Task).filter(models.Task.task_id==task_id).first()
    if task is None:
        raise HTTPException(status_code=404,detail="Task not found")
    db.delete(task)
    db.commit()
@app.delete('/projects/{project_id}',status_code=status.HTTP_200_OK)
async def delete_project(project_id: str, db:db_dependency):
    project=db.query(models.Project).filter(models.Project.project_id==project_id).first()
    if project is None:
        raise HTTPException(status_code=404,detail="Project not found")
    db.delete(project)
    db.commit()
@app.get('/projects',status_code=status.HTTP_200_OK)
async def get_projects(db:db_dependency):
    projects=db.query(models.Project).all()
    if projects is None:
        raise HTTPException(status_code=404,detail="No projects")
    return projects
@app.get('/tasks',status_code=status.HTTP_200_OK)
async def get_tasks(db:db_dependency):
    tasks=db.query(models.Task).all()
    if tasks is None:
        raise HTTPException(status_code=404,detail="No projects")
    return tasks
@app.put('/update-project/{project_id}',status_code=status.HTTP_202_ACCEPTED)
async def update_project(project_id: str,project: UpdateProjectBase,db: db_dependency):
    db_project=db.query(models.Project).filter(models.Project.project_id==project_id).first()
    for key, value in project.model_dump(exclude_unset=True).items():
        setattr(db_project, key, value)
    db.commit()
@app.put('/update-task/{task_id}',status_code=status.HTTP_202_ACCEPTED)
async def update_task(task_id: str,task: UpdateTaskBase,db: db_dependency):
    db_task=db.query(models.Task).filter(models.Task.task_id==task_id).first()
    for key, value in task.model_dump(exclude_unset=True).items():
        setattr(db_task, key, value)
    db.commit()
@app.post('/create-role',status_code=status.HTTP_201_CREATED)
async def create_role(role:RoleBase,db:db_dependency):
    db_role=models.Role(**role.dict())
    db.add(db_role)
    db.commit()
@app.post('/create-user-role',status_code=status.HTTP_201_CREATED)
async def create_user_role(user_role:UserRoleBase,db:db_dependency):
    db_role=models.UserRole(**user_role.dict())
    db.add(db_role)
    db.commit()
@app.put('/update-user-role/{user_role_id}',status_code=status.HTTP_202_ACCEPTED)
async def update_user_role(user_role_id: int,user_role: UpdateUserRoleBase,db:db_dependency):
    db_user_role=db.query(models.UserRole).filter(models.UserRole.user_role_id==user_role_id).first()
    for key, value in user_role.model_dump(exclude_unset=True).items():
        setattr(db_user_role, key, value)
    db.commit()
@app.delete('/delete-user-role/{user_role_id}', status_code=status.HTTP_200_OK)
async def delete_user_role(user_role_id: int, db:db_dependency):
    db_user_role=db.query(models.UserRole).filter(models.UserRole.user_role_id==user_role_id).first()
    if db_user_role is None:
        raise HTTPException(status_code=404,detail="Project not found")
    db.delete(db_user_role)
    db.commit()
@app.get('/admin',status_code=status.HTTP_200_OK)
async def admin(db:db_dependency):
    admins=db.query(models.Admin).all()
    if admins is None:
        raise HTTPException(status_code=404,detail="No projects")
    return admins