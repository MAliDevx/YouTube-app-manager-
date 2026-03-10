import React, { useState } from 'react';
import { Send, Search, History, Users, User, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Select } from '../components/ui/Select';
import { notifications as initialNotifications, users } from '../services/mockData';
import { Notification } from '../types';
import toast from 'react-hot-toast';

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [sendTo, setSendTo] = useState<'All' | 'Selected'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification sent successfully');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Notifications</h2>
        <p className="text-slate-500 mt-1">Send push notifications to your users.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5 text-indigo-600" />
                Send Notification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSend}>
                <div className="space-y-2">
                  <Label htmlFor="title">Notification Title</Label>
                  <Input id="title" placeholder="e.g. New Movie Added!" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="flex w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                    placeholder="Enter your message here..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sendTo">Send To</Label>
                  <Select id="sendTo" value={sendTo} onChange={(e) => setSendTo(e.target.value as any)}>
                    <option value="All">All Users</option>
                    <option value="Selected">Selected Users</option>
                  </Select>
                </div>

                {sendTo === 'Selected' && (
                  <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                    <Label>Select Users</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        placeholder="Search users..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-2 space-y-1">
                      {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map(u => (
                        <div key={u.id} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer">
                          <input type="checkbox" className="rounded text-indigo-600" />
                          <span className="text-sm">{u.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Send Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-600" />
                Notification History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Sent To</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((n) => (
                    <TableRow key={n.id}>
                      <TableCell className="font-medium">{n.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{n.message}</TableCell>
                      <TableCell>
                        <Badge variant={n.sentTo === 'All' ? 'default' : 'secondary'}>
                          {n.sentTo === 'All' ? <Users className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                          {n.sentTo}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {new Date(n.sentAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
