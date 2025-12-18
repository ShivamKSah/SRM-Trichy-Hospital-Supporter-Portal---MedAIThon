import React, { useState } from 'react';
import type { DoctorView, Patient, Doctor } from '../../types';
import {
    DashboardIcon,
    ClinicalIcon,
    PatientsIcon,
    ClipboardListIcon,
    HeartbeatIcon,
    PillIcon,
    FolderIcon,
    FlaskIcon,
    CogIcon,
    DocumentTextIcon,
    TriageIcon,
    ChevronDownIcon,
    AdminIcon,
    CalendarIcon,
    ChatBubbleIcon,
    BellIcon,
    DesktopComputerIcon,
    CreditCardIcon,
    ChartBarIcon,
    UserIcon,
    QuestionMarkCircleIcon
} from '../icons';
import { TriageRiskBadge } from '../TriageRiskBadge';

interface DoctorSidebarProps {
    activeView: DoctorView;
    setActiveView: (view: DoctorView) => void;
    doctors: Doctor[];
    patients: Patient[];
    currentDoctorId: string;
}

const navItems = {
    main: [
        { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
        { id: 'patient_list', label: 'Patient List', icon: PatientsIcon },
        { id: 'patient_reports', label: 'Patient Reports', icon: DocumentTextIcon },
        { id: 'ventilator_monitor', label: 'Vitals Monitoring', icon: HeartbeatIcon },
    ],
    departments: [
        { id: 'cardiology', label: 'Cardiology', icon: DocumentTextIcon },
        { id: 'neurology', label: 'Neurology', icon: DocumentTextIcon },
        { id: 'orthopedics', label: 'Orthopedics', icon: DocumentTextIcon },
        { id: 'general_medicine', label: 'General Medicine', icon: DocumentTextIcon },
        { id: 'pediatrics', label: 'Pediatrics', icon: DocumentTextIcon },
        { id: 'emergency', label: 'Emergency', icon: DocumentTextIcon },
        { id: 'gynecology', label: 'Gynecology', icon: DocumentTextIcon },
    ],
    clinical: [
        { id: 'prescriptions', label: 'Prescriptions', icon: PillIcon },
        { id: 'case_history', label: 'Case History', icon: FolderIcon },
        { id: 'tests_results', label: 'Test & Results', icon: FlaskIcon },
        { id: 'diagnostic_tools', label: 'Diagnostic Tools', icon: CogIcon },
        { id: 'current_status', label: 'Current Status', icon: TriageIcon },
        { id: 'treatment_module', label: 'Treatment Module', icon: ClinicalIcon },
    ],
    support: [
        { id: 'appointments_schedule', label: 'Appointments', icon: CalendarIcon },
        { id: 'messaging', label: 'Messaging', icon: ChatBubbleIcon },
        { id: 'notifications', label: 'Notifications', icon: BellIcon },
        { id: 'inventory_equipment', label: 'Inventory & Equipment', icon: DesktopComputerIcon },
        { id: 'billing_insurance', label: 'Billing Overview', icon: CreditCardIcon },
        { id: 'analytics_reports', label: 'Analytics & Reports', icon: ChartBarIcon },
        { id: 'settings_profile', label: 'Settings & Profile', icon: UserIcon },
        { id: 'help_documentation', label: 'Help / Documentation', icon: QuestionMarkCircleIcon },
    ]
} as const;


type NavItemType = (typeof navItems.main)[number] | (typeof navItems.clinical)[number] | (typeof navItems.departments)[number] | (typeof navItems.support)[number];

const NavItem: React.FC<{
    item: NavItemType;
    isActive: boolean;
    onClick: () => void;
    patientCount?: number; // Add patient count prop
}> = ({ item, isActive, onClick, patientCount }) => {
    const { icon: Icon, label } = item;
    const baseClasses = "flex items-center w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200";
    const activeClasses = "bg-srm-lightblue text-srm-blue";
    const inactiveClasses = "text-white hover:bg-white/20";

    return (
        <li>
            <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="flex-grow">{label}</span>
                {patientCount !== undefined && patientCount > 0 && (
                    <span className="bg-srm-blue/30 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {patientCount}
                    </span>
                )}
            </button>
        </li>
    );
};

const PatientItem: React.FC<{
    patient: Patient;
    isActive: boolean;
    onClick: () => void;
}> = ({ patient, isActive, onClick }) => {
    const baseClasses = "flex items-center w-full text-left px-4 py-2 text-sm rounded-lg transition-colors duration-200 ml-4";
    const activeClasses = "bg-srm-lightblue text-srm-blue";
    const inactiveClasses = "text-white hover:bg-white/20";

    return (
        <li>
            <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                <span className="flex-grow truncate">{patient.name}</span>
                <TriageRiskBadge risk={patient.triageInfo.risk} />
            </button>
        </li>
    );
};

const NavCategory: React.FC<{
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    startOpen?: boolean;
}> = ({ title, icon: Icon, children, startOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startOpen);

    return (
        <div>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-2 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
            >
                <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-3"/>
                    <span>{title}</span>
                </div>
                <ChevronDownIcon className={`h-5 w-5 transform transition-transform ${isOpen ? '' : '-rotate-90'}`} />
            </button>
            {isOpen && <div className="mt-1 pl-4 border-l border-white/20 ml-4">{children}</div>}
        </div>
    );
};

const DepartmentCategory: React.FC<{
    title: string;
    icon: React.ElementType;
    patients: Patient[];
    activeView: DoctorView;
    setActiveView: (view: DoctorView) => void;
    departmentId: string;
    patientCounts: Record<string, number>;
}> = ({ title, icon: Icon, patients, activeView, setActiveView, departmentId, patientCounts }) => {
    const [isOpen, setIsOpen] = useState(true);
    const departmentPatients = patients.filter(p => p.department === title);

    return (
        <div>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-2 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
            >
                <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-3"/>
                    <span>{title}</span>
                    {patientCounts[title] !== undefined && patientCounts[title] > 0 && (
                        <span className="bg-srm-blue/30 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">
                            {patientCounts[title]}
                        </span>
                    )}
                </div>
                <ChevronDownIcon className={`h-5 w-5 transform transition-transform ${isOpen ? '' : '-rotate-90'}`} />
            </button>
            {isOpen && (
                <div className="mt-1 pl-4 border-l border-white/20 ml-4">
                    <ul className="space-y-1 py-1">
                        <li>
                            <button 
                                onClick={() => setActiveView(departmentId as DoctorView)}
                                className={`flex items-center w-full text-left px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                                    activeView === departmentId ? 'bg-srm-lightblue text-srm-blue' : 'text-white hover:bg-white/20'
                                }`}
                            >
                                <span className="flex-grow">All Patients</span>
                            </button>
                        </li>
                        {departmentPatients.map(patient => (
                            <PatientItem
                                key={patient.id}
                                patient={patient}
                                isActive={false}
                                onClick={() => {
                                    // This would need to be implemented to show patient details
                                    // For now, we'll just navigate to the department view
                                    setActiveView(departmentId as DoctorView);
                                }}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


export const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ activeView, setActiveView, doctors, patients, currentDoctorId }) => {
    // Calculate patient counts for each department
    const departmentPatientCounts: Record<string, number> = {};
    
    // Get current doctor's department
    const currentDoctor = doctors.find(d => d.id === currentDoctorId);
    const currentDoctorDepartment = currentDoctor?.department || '';
    
    // Count patients in each department
    patients.forEach(patient => {
        if (patient.department) {
            departmentPatientCounts[patient.department] = (departmentPatientCounts[patient.department] || 0) + 1;
        }
    });
    
    // Count patients assigned to current doctor
    const myPatientCount = patients.filter(p => p.assignedDoctorId === currentDoctorId).length;
    
    // Define all departments with their IDs
    const allDepartments = [
        { id: 'cardiology', label: 'Cardiology', icon: DocumentTextIcon },
        { id: 'neurology', label: 'Neurology', icon: DocumentTextIcon },
        { id: 'orthopedics', label: 'Orthopedics', icon: DocumentTextIcon },
        { id: 'general_medicine', label: 'General Medicine', icon: DocumentTextIcon },
        { id: 'pediatrics', label: 'Pediatrics', icon: DocumentTextIcon },
        { id: 'emergency', label: 'Emergency', icon: DocumentTextIcon },
        { id: 'gynecology', label: 'Gynecology', icon: DocumentTextIcon },
    ];
    
    console.log('Total patients:', patients.length);
    console.log('Department patient counts:', departmentPatientCounts);
    console.log('All departments:', allDepartments);
    
    return (
        <aside className="w-72 bg-srm-blue text-white flex flex-col flex-shrink-0">
            <div className="h-20 flex items-center justify-center px-4 border-b border-white/20">
                <h1 className="text-xl font-bold tracking-wider">Doctor's Portal</h1>
            </div>
            <nav className="flex-1 px-2 py-4 overflow-y-auto">
                <ul className="space-y-4">
                    {/* Main Section */}
                    <li>
                         <ul className="space-y-1">
                            {navItems.main.map(item => (
                                <NavItem
                                    key={item.id}
                                    item={item}
                                    isActive={activeView === item.id}
                                    onClick={() => setActiveView(item.id)}
                                    patientCount={item.id === 'patient_list' ? myPatientCount : undefined}
                                />
                            ))}
                        </ul>
                    </li>

                    {/* Departments Section */}
                    <li>
                        <div className="flex items-center justify-between w-full px-2 py-2 text-sm font-semibold text-white/80">
                            <div className="flex items-center">
                                <ClinicalIcon className="h-5 w-5 mr-3"/>
                                <span>Departments</span>
                            </div>
                        </div>
                        <div className="mt-1 pl-4 border-l border-white/20 ml-4">
                            <ul className="space-y-1 py-1">
                                {allDepartments.map(dept => (
                                    <NavItem
                                        key={dept.id}
                                        item={{ 
                                            id: dept.id, 
                                            label: dept.label, 
                                            icon: dept.icon 
                                        }}
                                        isActive={activeView === dept.id}
                                        onClick={() => setActiveView(dept.id as DoctorView)}
                                        patientCount={departmentPatientCounts[dept.label] || 0}
                                    />
                                ))}
                            </ul>
                        </div>
                    </li>
                    
                     {/* Clinical Section */}
                    <li>
                        <NavCategory title="Clinical Tools" icon={FolderIcon}>
                            <ul className="space-y-1 py-1">
                                {navItems.clinical.map(item => (
                                    <NavItem
                                        key={item.id}
                                        item={item}
                                        isActive={activeView === item.id}
                                        onClick={() => setActiveView(item.id)}
                                    />
                                ))}
                            </ul>
                        </NavCategory>
                    </li>
                    
                    {/* Support Section */}
                    <li>
                        <NavCategory title="Support & Admin" icon={AdminIcon}>
                            <ul className="space-y-1 py-1">
                                {navItems.support.map(item => (
                                    <NavItem
                                        key={item.id}
                                        item={item}
                                        isActive={activeView === item.id}
                                        onClick={() => setActiveView(item.id)}
                                    />
                                ))}
                            </ul>
                        </NavCategory>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};