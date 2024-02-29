'use client'

import { DataTable } from "./tasks/data-table";
import { Task, columns } from "../app/tasks/columns"
import { getTasks } from "@/api/getTasks";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch initial tasks
    const fetchTasks = async () => {
      try {
        const fetchedData = await getTasks();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();

    // Set up socket connection
    const socket = io('http://localhost:3000');

    // // Listening for task updates
    // socket.on('taskAdded', (newTask) => {
    //   setData(prevData => [...prevData, newTask]);
    // });

    socket.on('taskDeleted', (deletedTaskId) => {
      setData(prevData => prevData.filter(task => task.id !== deletedTaskId));
    });

    // socket.on('taskUpdated', (updatedTask) => {
    //   setData(prevData => prevData.map(task => task.id === updatedTask.id ? updatedTask : task));
    // });

    // Clean up on component unmount
    return () => { 
      socket.disconnect() 
    };
  }, []);
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
