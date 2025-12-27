# GearGuard: The Ultimate Maintenance Tracker

This repository contains our team's solution for the **Odoo Hackathon**. [cite_start]We are a team of **four developers** dedicated to building a maintenance management system that connects Equipment, Teams, and Requests[cite: 5].

## Team Members
* **Patel Darsh**
* **Panchal Om**
* **Rasania Mihir**
* **Rathod Dhaval**

---

## Problem Statement
[cite_start]The objective is to develop a maintenance management system (**GearGuard**) that allows a company to track its assets (machines, vehicles, computers) and manage maintenance requests[cite: 4].

### Core Functional Areas

#### 1. Equipment Management
* [cite_start]**Central Database**: Serves as a central repository for all company assets[cite: 8].
* [cite_start]**Technical Details**: Tracks details including Name, Serial Number, Purchase Date, and Warranty information[cite: 16, 17].
* [cite_start]**Asset Tracking**: Supports tracking by Department or by Employee[cite: 11].
* [cite_start]**Responsibility**: Each piece of equipment is assigned a dedicated Maintenance Team and a default technician[cite: 12].

#### 2. Specialized Maintenance Teams
* [cite_start]**Team Definition**: Ability to define specialized teams such as Mechanics, Electricians, or IT Support[cite: 22].
* [cite_start]**Workflow Logic**: Specific users (technicians) are linked to teams; only team members should pick up requests assigned to their team[cite: 23, 24].

#### 3. Maintenance Requests
* [cite_start]**Request Lifecycle**: Handles the progression of repair jobs[cite: 26].
* **Request Types**: 
    * [cite_start]**Corrective**: Unplanned repairs for breakdowns[cite: 28].
    * [cite_start]**Preventive**: Planned routine checkups[cite: 29].
* [cite_start]**Key Fields**: Tracks subjects, affected equipment, scheduled dates, and repair duration[cite: 31, 33, 34, 35].

### Functional Workflows

#### Flow 1: The Breakdown (Corrective)
1. [cite_start]**Request Creation**: Any user can create a maintenance request[cite: 39].
2. [cite_start]**Auto-Fill Logic**: Selecting an equipment automatically fetches the category and Maintenance Team from the equipment record[cite: 41].
3. [cite_start]**Execution**: The request starts in the New stage, moves to In Progress, and finishes at the Repaired stage[cite: 42, 44, 45].
4. [cite_start]**Recording**: Technicians record the Hours Spent (Duration) upon completion[cite: 45].

#### Flow 2: The Routine Checkup (Preventive)
1. [cite_start]**Scheduling**: A manager creates a request with the type Preventive and sets a Scheduled Date[cite: 47, 48].
2. [cite_start]**Visibility**: These requests appear on the Calendar View for technician awareness[cite: 49].

---

## Technical and UI Requirements
* [cite_start]**Maintenance Kanban Board**: A workspace for technicians grouped by stages (New, In Progress, Repaired, Scrap) with drag-and-drop functionality[cite: 53, 55, 57].
* [cite_start]**Visual Indicators**: Kanban cards show technician avatars and display red indicators if a request is overdue[cite: 59, 60].
* [cite_start]**Smart Buttons**: Equipment forms must include a Maintenance button showing the count of open requests and providing access to related history[cite: 71, 73, 72].
* [cite_start]**Scrap Logic**: Moving a request to the Scrap stage indicates the equipment is no longer usable[cite: 76].
* [cite_start]**Reporting**: Pivot or Graph reports showing the number of requests per team or equipment category[cite: 64, 65].
