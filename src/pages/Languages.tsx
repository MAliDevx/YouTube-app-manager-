import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Label } from '../components/ui/Label';
import { Select } from '../components/ui/Select';
import { languages as initialLanguages } from '../services/mockData';
import { Language } from '../types';
import toast from 'react-hot-toast';

export const Languages: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);

  const filteredLanguages = languages.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingLanguage ? 'Language updated successfully' : 'Language added successfully');
    setIsModalOpen(false);
    setEditingLanguage(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this language?')) {
      setLanguages(languages.filter(l => l.id !== id));
      toast.success('Language deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Languages</h2>
          <p className="text-slate-500 mt-1">Manage available movie languages.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Language
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search languages..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Language ID</TableHead>
                <TableHead>Language Name</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLanguages.map((lang) => (
                <TableRow key={lang.id}>
                  <TableCell className="font-mono text-xs text-slate-500">#{lang.id}</TableCell>
                  <TableCell className="font-medium">{lang.name}</TableCell>
                  <TableCell className="text-xl">{lang.icon}</TableCell>
                  <TableCell>
                    <Badge variant={lang.status === 'Active' ? 'success' : 'secondary'}>
                      {lang.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setEditingLanguage(lang);
                          setIsModalOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(lang.id)}
                      >
                        <Trash2 className="w-4 h-4 text-rose-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredLanguages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                    No languages found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLanguage(null);
        }}
        title={editingLanguage ? 'Edit Language' : 'Add New Language'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Language</Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSave}>
          <div className="space-y-2">
            <Label htmlFor="name">Language Name</Label>
            <Input id="name" placeholder="e.g. English, Spanish" defaultValue={editingLanguage?.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon (Emoji or URL)</Label>
            <Input id="icon" placeholder="e.g. 🇺🇸" defaultValue={editingLanguage?.icon} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select id="status" defaultValue={editingLanguage?.status || 'Active'}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </div>
        </form>
      </Modal>
    </div>
  );
};
