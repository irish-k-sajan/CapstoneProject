from sqlalchemy import Boolean, Column, Integer, String, Date, ForeignKey, PrimaryKeyConstraint
from database import Base
from sqlalchemy.orm import relationship
import uuid
class Project(Base):
    __tablename__ = 'projects'
    project_id = Column(String(50), primary_key=True,index=True, default= lambda: str(uuid.uuid4()))
    project_name = Column(String(32), nullable=False)
    project_description = Column(String(150))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    project_owner_id = Column(String(50), ForeignKey('employees.employee_id'), nullable=False)
    owner = relationship("Employee", back_populates='projects')
    task = relationship("Task", back_populates="project")
    user_project=relationship("UserRole",back_populates="project_user")


class Task(Base):
    __tablename__ = 'tasks'
    task_id = Column(String(50), primary_key=True,index=True, default=lambda: str(uuid.uuid4()))
    task_name = Column(String(32), nullable=False)
    task_description = Column(String(150))
    task_status = Column(String(25), nullable=False)
    task_owner_id = Column(String(50), ForeignKey("employees.employee_id"), nullable=False)
    due_date = Column(Date, nullable=False)
    project_id = Column(String(50), ForeignKey('projects.project_id'), nullable=False)
    project = relationship("Project", back_populates="task")
    task_owner = relationship("Employee", back_populates="tasks")
    user_task=relationship("TaskUserRole",back_populates="task_user")


class Employee(Base):
    __tablename__ = 'employees'
    employee_id = Column(String(50), primary_key=True, index=True, nullable=False)
    employee_name = Column(String(32))
    employee_email = Column(String(60))
    projects = relationship("Project", back_populates="owner")
    tasks = relationship("Task", back_populates="task_owner")
    emp_user=relationship("UserRole",back_populates="user_emp")
    emp_admin=relationship("Admin",back_populates="admin_emp")
    emp_task=relationship("TaskUserRole",back_populates="task_emp")
class Role(Base):
    __tablename__='role'
    role_id=Column(Integer,primary_key=True,autoincrement=True)
    role_name=Column(String(50),nullable=False)
    user_role=relationship("UserRole",back_populates="role_user")

class UserRole(Base):
    __tablename__='userrole'
    user_role_id = Column(Integer, primary_key=True, autoincrement=True)
    role_id=Column(Integer,ForeignKey('role.role_id'),nullable=False)
    employee_id=Column(String(50), ForeignKey('employees.employee_id'),nullable=False)
    project_id=Column(String(50), ForeignKey('projects.project_id'), nullable=False)
    project_user=relationship("Project",back_populates="user_project")
    user_emp=relationship("Employee",back_populates="emp_user")
    role_user=relationship("Role",back_populates="user_role")
class Admin(Base):
    __tablename__='admin_users'
    admin_id=Column(Integer,primary_key=True,autoincrement=True)
    employee_id=Column(String(50), ForeignKey('employees.employee_id'),nullable=False)
    admin_emp=relationship("Employee",back_populates="emp_admin")
class TaskUserRole(Base):
    __tablename__='task_users'
    task_user_id=Column(Integer,primary_key=True,autoincrement=True)
    task_id=Column(String(50), ForeignKey('tasks.task_id'), nullable=False)
    employee_id=Column(String(50), ForeignKey('employees.employee_id'),nullable=False)
    task_emp=relationship("Employee",back_populates="emp_task")
    task_user=relationship("Task",back_populates="user_task")



