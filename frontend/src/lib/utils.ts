import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Fetch data and render our table
import { Task } from "../app/tasks/columns"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  return [
    {
      id: "ad9a0-df3",
      description: "hello im jinyang",
      journal: "i like coding",
      status: "in progress",
    },
  ]
}