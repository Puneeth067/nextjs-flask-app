"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchData, postData } from '@/lib/api';

interface Item {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData('items');
        setItems(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load data');
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await postData('items', newItem);
      setItems([...items, data]);
      setNewItem({ name: '', description: '' });
    } catch (error) {
      setError('Failed to add item');
    }
  };

  if (loading) return Loading...;
  if (error) return {error};

  return (
    
      Next.js with Flask Backend
      
      
        
          Add New Item
          
            
              Name
              <Input 
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                required
              />
            
            
              Description
              <Input 
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                required
              />
            
            Add Item
          
        
        
        
          Items
          
            {items.length === 0 ? (
              No items found
            ) : (
              items.map((item) => (
                
                  
                    {item.name}
                  
                  
                    {item.description}
                  
                  
                    Edit
                  
                
              ))
            )}
          
        
      
    
  );
}