"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Settings, 
  Globe, 
  Shield, 
  Bell,
  Database,
  Palette,
  Save,
  RefreshCw
} from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Configure system preferences, appearance, and behavior.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="h-5 w-5" />
              Save Changes
            </CardTitle>
            <CardDescription>
              Save all current settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save All
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Reset to Default
            </CardTitle>
            <CardDescription>
              Restore default settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Export Settings
            </CardTitle>
            <CardDescription>
              Export current configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Basic system configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <Input placeholder="NexGPetrolube" defaultValue="NexGPetrolube" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">System Timezone</label>
              <Select defaultValue="asia-kolkata">
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="america-new-york">America/New_York (EST)</SelectItem>
                  <SelectItem value="europe-london">Europe/London (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Format</label>
              <Select defaultValue="dd-mm-yyyy">
                <SelectTrigger>
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Select defaultValue="inr">
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="usd">US Dollar ($)</SelectItem>
                  <SelectItem value="eur">Euro (€)</SelectItem>
                  <SelectItem value="gbp">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <Select defaultValue="light">
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Color</label>
              <Select defaultValue="blue">
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Font Size</label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Sidebar Position</label>
              <Select defaultValue="left">
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Configure security and authentication options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input type="number" placeholder="30" defaultValue="30" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Login Attempts</label>
              <Input type="number" placeholder="5" defaultValue="5" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Password Policy</label>
              <Select defaultValue="strong">
                <SelectTrigger>
                  <SelectValue placeholder="Select policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (8 chars)</SelectItem>
                  <SelectItem value="medium">Medium (10 chars + symbols)</SelectItem>
                  <SelectItem value="strong">Strong (12 chars + symbols + numbers)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Two-Factor Authentication</label>
              <Select defaultValue="optional">
                <SelectTrigger>
                  <SelectValue placeholder="Select requirement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disabled">Disabled</SelectItem>
                  <SelectItem value="optional">Optional</SelectItem>
                  <SelectItem value="required">Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Security Features</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="ssl" defaultChecked />
                <label htmlFor="ssl" className="text-sm">Force SSL/TLS</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="audit" defaultChecked />
                <label htmlFor="audit" className="text-sm">Enable Audit Logs</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="ip-whitelist" />
                <label htmlFor="ip-whitelist" className="text-sm">IP Address Whitelist</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="rate-limit" defaultChecked />
                <label htmlFor="rate-limit" className="text-sm">Rate Limiting</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Configure system notifications and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Email Notifications</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="email-security" defaultChecked />
                <label htmlFor="email-security" className="text-sm">Security Alerts</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="email-system" defaultChecked />
                <label htmlFor="email-system" className="text-sm">System Updates</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="email-user" />
                <label htmlFor="email-user" className="text-sm">User Activity</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="email-reports" />
                <label htmlFor="email-reports" className="text-sm">Report Generation</label>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">In-App Notifications</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="inapp-security" defaultChecked />
                <label htmlFor="inapp-security" className="text-sm">Security Alerts</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="inapp-system" defaultChecked />
                <label htmlFor="inapp-system" className="text-sm">System Updates</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="inapp-user" defaultChecked />
                <label htmlFor="inapp-user" className="text-sm">User Activity</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="inapp-reports" defaultChecked />
                <label htmlFor="inapp-reports" className="text-sm">Report Generation</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Storage</CardTitle>
          <CardDescription>
            Configure data retention and storage options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Retention Period (days)</label>
              <Input type="number" placeholder="365" defaultValue="365" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Backup Frequency</label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Max File Upload Size (MB)</label>
              <Input type="number" placeholder="10" defaultValue="10" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Database Connection Pool</label>
              <Input type="number" placeholder="20" defaultValue="20" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Data Features</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="data-encryption" defaultChecked />
                <label htmlFor="data-encryption" className="text-sm">Data Encryption</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="data-compression" defaultChecked />
                <label htmlFor="data-compression" className="text-sm">Data Compression</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="data-backup" defaultChecked />
                <label htmlFor="data-backup" className="text-sm">Automatic Backups</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="data-archive" />
                <label htmlFor="data-archive" className="text-sm">Data Archiving</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
