from sqlalchemy import Boolean, Column, Integer, String, Date, ForeignKey
from database import Base
from sqlalchemy.orm import relationship


class Project(Base):
    __tablename__ = 'projects'
    project_id = Column(Integer, primary_key=True,index=True, autoincrement=True)
    project_name = Column(String(32), nullable=False)
    project_description = Column(String(150))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    project_owner_id = Column(Integer, ForeignKey(
        'employees.employee_id'), nullable=False)
    owner = relationship("Employee", back_populates='projects')
    task = relationship("Task", back_populates="project")


class Task(Base):
    __tablename__ = 'tasks'
    task_id = Column(Integer, primary_key=True,index=True ,autoincrement=True)
    task_name = Column(String(32), nullable=False)
    task_description = Column(String(150))
    task_status = Column(String(25), nullable=False)
    task_owner_id = Column(Integer, ForeignKey(
        "employees.employee_id"), nullable=False)
    due_date = Column(Date, nullable=False)
    project_id = Column(Integer, ForeignKey(
        'projects.project_id'), nullable=False)
    project = relationship("Project", back_populates="task")
    task_owner = relationship("Employee", back_populates="tasks")


class Employee(Base):
    __tablename__ = 'employees'
    employee_id = Column(Integer, primary_key=True, index=True, nullable=False)
    employee_name = Column(String(32))
    employee_email = Column(String(60))
    projects = relationship("Project", back_populates="owner")
    tasks = relationship("Task", back_populates="task_owner")
