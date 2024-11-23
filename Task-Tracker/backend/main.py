from fastapi import FastAPI,HTTPException,Depends,status
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import models
from datetime import date
from typing import  Annotated, Optional
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
models.Base.metadata.create_all(bind=engine)
origin=[
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]

)

class ProjectBase(BaseModel):
    #project_id: int
    project_name:str
    project_description: str
    start_date: date
    end_date: date
    project_owner_id:int
class UpdateProjectBase(BaseModel):
    project_name: Optional[str]=None
    project_description: Optional[str]=None
    start_date: Optional[date]=None
    end_date: Optional[date]=None
    project_owner_id:Optional[int]=None

class TaskBase(BaseModel):
    #task_id :int
    task_name: str
    task_description:str
    task_status :str
    task_owner_id: int
    due_date: date
    project_id: int

class UpdateTaskBase(BaseModel):
    task_id :Optional[int]=None
    task_name: Optional[str]=None
    task_description:Optional[str]=None
    task_status :Optional[str]=None
    task_owner_id: Optional[int]=None
    due_date: Optional[date]=None
    project_id: Optional[int]=None

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

@app.get('/projects/{project_id}',status_code=status.HTTP_200_OK)
async def read_project(project_id:int, db:db_dependency):
    project=db.query(models.Project).filter(models.Project.project_id==project_id).first()
    if project is None:
        raise HTTPException(status_code=404,detail='Project not found')
    return project
@app.get('/tasks/{task_id}',status_code=status.HTTP_200_OK)
async def read_task(task_id: int, db:db_dependency):
    task=db.query(models.Task).filter(models.Task.task_id==task_id).first()
    if task is None:
        raise HTTPException(status_code=404,detail="Task not found")
    return task
@app.delete('/tasks/{task_id}',status_code=status.HTTP_200_OK)
async def delete_task(task_id: int, db:db_dependency):
    task=db.query(models.Task).filter(models.Task.task_id==task_id).first()
    if task is None:
        raise HTTPException(status_code=404,detail="Task not found")
    db.delete(task)
    db.commit()
@app.delete('/projects/{project_id}',status_code=status.HTTP_200_OK)
async def delete_project(project_id: int, db:db_dependency):
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
async def update_project(project_id: int,project: UpdateProjectBase,db: db_dependency):
    db_project=db.query(models.Project).filter(models.Project.project_id==project_id).first()
    for key, value in project.model_dump(exclude_unset=True).items():
        setattr(db_project, key, value)
    db.commit()
@app.put('/update-task/{task_id}',status_code=status.HTTP_202_ACCEPTED)
async def update_task(task_id: int,task: UpdateTaskBase,db: db_dependency):
    db_task=db.query(models.Task).filter(models.Task.task_id==task_id).first()
    for key, value in task.model_dump(exclude_unset=True).items():
        setattr(db_task, key, value)
    db.commit()
