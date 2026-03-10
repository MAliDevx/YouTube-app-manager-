import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Shield, Clock, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { users, watchHistory } from '../services/mockData';

export const UserDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find(u => u.id === id);
  const history = watchHistory.filter(h => h.userId === id);

  if (!user) return <div>User not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/users')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">User Details</h2>
          <p className="text-slate-500 mt-1">Detailed information and activity for {user.name}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="h-24 bg-indigo-600" />
            <CardContent className="relative pt-12 text-center">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                <div className="w-full h-full bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-3xl font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
              <p className="text-slate-500 text-sm mt-1">{user.email}</p>
              <div className="mt-4 flex justify-center">
                <Badge variant={user.subscriptionStatus === 'Active' ? 'success' : 'destructive'}>
                  {user.subscriptionStatus} Subscription
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-slate-400">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email Address</p>
                  <p className="text-sm font-medium text-slate-700">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Phone Number</p>
                  <p className="text-sm font-medium text-slate-700">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Registration Date</p>
                  <p className="text-sm font-medium text-slate-700">{user.registrationDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-slate-400">Subscription Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Current Package</p>
                  <p className="text-sm font-bold text-indigo-600">{user.package}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Start Date
                  </p>
                  <p className="text-sm font-medium text-slate-700">{user.subscriptionStart || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <History className="w-3 h-3" /> Expiry Date
                  </p>
                  <p className="text-sm font-medium text-slate-700">{user.subscriptionExpiry || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-600" />
                Watch History
              </CardTitle>
              <Badge variant="secondary">{history.length} Movies Watched</Badge>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Movie Name</TableHead>
                    <TableHead>Date Watched</TableHead>
                    <TableHead>Duration Watched</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((h) => (
                    <TableRow key={h.id}>
                      <TableCell className="font-medium">{h.movieName}</TableCell>
                      <TableCell>{h.date}</TableCell>
                      <TableCell>{h.durationWatched}</TableCell>
                    </TableRow>
                  ))}
                  {history.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center text-slate-500">
                        No watch history found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
