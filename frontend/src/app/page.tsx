"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchData, postData, deleteData, updateData } from '@/lib/api';

interface Item {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchData('items');
      setItems(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        // Update existing item
        const updatedItem = await updateData(`items/${editingItem.id}`, {
          name: newItem.name,
          description: newItem.description
        });
        
        setItems(items.map(item => 
          item.id === editingItem.id ? updatedItem : item
        ));
        setEditingItem(null);
      } else {
        // Create new item
        const data = await postData('items', newItem);
        setItems([...items, data]);
      }
      
      // Reset form
      setNewItem({ name: '', description: '' });
    } catch (error) {
      setError(editingItem ? 'Failed to update item' : 'Failed to add item');
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      description: item.description
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteData(`items/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      setError('Failed to delete item');
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setNewItem({ name: '', description: '' });
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Next.js with Flask Backend</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <Input 
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description">Description</label>
                <Input 
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button type="submit">
                {editingItem ? 'Update Item' : 'Add Item'}
              </Button>
              {editingItem && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No items found</p>
            ) : (
              items.map((item: Item) => (
                <Card key={item.id} className="mb-3">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{item.description}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}