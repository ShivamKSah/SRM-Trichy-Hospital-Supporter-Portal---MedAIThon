import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { TriageView } from './components/TriageView';
import { PatientDetailView } from './components/PatientDetailView';
import { mockPatients, generatePID, mockDoctors } from './services/mockData';
import { DoctorDashboard } from './components/doctor_dashboard/DoctorDashboard';
import { Patient, View, PatientPrescription, Appointment, Doctor, VitalSignEntry, Notification, ActivityLog } from './types';
import { Header } from './components/Header';
import { navStructure } from './navigation';
import { LoginView } from './components/LoginView';
import { PatientDashboard } from './components/patient_dashboard/PatientDashboard';
import { ReceptionistDashboard } from './components/receptionist/ReceptionistDashboard';
import { InternDashboard } from './components/intern_dashboard/InternDashboard';
import { TestAIFeatures } from './components/TestAIFeatures';

// Import all module views
import {
    RegistrationView, ComplaintPortalView, DigitalVitalsView, EPrescriptionView, PharmacyISView,
    DrugInfoView, LISView, DTISView, HospitalBillingView, EmergencyCaseMgmtView,
    MLCSystemView, AMAWorkflowView, BroughtDeadRecordView,
    SecurityLoggingView,
    DietNutritionView, KitchenModuleView, FnBOrderView, PhysiotherapyView, OccupationalTherapyView,
    OTSchedulingView, ICUMonitoringView, WardManagementView, MHCView, NursingDeploymentView,
    DoctorsDeploymentView, MedicalGasTrackingView, PatientPorterView, PatientFeedbackView,
    OutsourcedTestView, DischargeTranscriptionView,
    ComplianceLicenseView, AVDocumentationView,
    HousekeepingWasteMgmtView, ComplaintsIssueTrackerView, ITManagementView, MortuaryRecordView, TransplantCaseMgmtView,
    CSSDWorkflowView, LaundryLinenView, HRTrainingView, PerformanceReviewView, NarcoticsControlView,
    AccountsFinanceView, AccreditationMgmtView, QualityComplianceView, OperationsDashboardView, InsuranceClaimsView,
    CorporateTieupsView, GeneralPurchaseStoreView, MedicationErrorView, NCDPreventionChatbotView, SettingsView,
    InternDashboardView
} from './components/modules';

import { NurseDashboard } from './components/nurse';
import type { WardBed } from './types';

// Simulate a secure hashing mechanism. In a real application, use a library like bcrypt.
const FAKE_SALT = 'srm-hospital-supporter-system';

/**
 * This is a placeholder for a real hashing function.
 * It's not secure and is for demonstration purposes only.
 * @param password The plain-text password.
 * @returns A simulated hash string.
 */
const hashPassword = (password: string): string => {
  if (!password) return '';
  const reversed = [...password].reverse().join('');
  return `sim_hash$${reversed}$${FAKE_SALT}`;
};

/**
 * This is a placeholder for a real password comparison function.
 * @param password The plain-text password from user input.
 * @param hash The stored "hashed" password.
 * @returns True if the password matches the hash.
 */
const comparePassword = (password: string, hash: string): boolean => {
  if (!password || !hash) return false;
  return hashPassword(password) === hash;
};


const HisSuite: React.FC<{ onLogout: () => void; userRole: string }> = ({ onLogout, userRole }) => {
  const [activeView, setActiveView] = useState<View>(userRole === 'Intern' ? 'intern_dashboard' : 'dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(mockPatients[0]);

  const handlePatientSelect = useCallback((patient: Patient) => {
    setSelectedPatient(patient);
    setActiveView('patient');
  }, []);
  
  const handleViewChange = useCallback((view: View) => {
     if (view === 'patient' && !selectedPatient) {
        setSelectedPatient(mockPatients[0]);
     }
     setActiveView(view);
  }, [selectedPatient]);

  const getHeaderTitle = () => {
    if (activeView === 'patient' && selectedPatient) {
        return `Patient Overview: ${selectedPatient.name}`;
    }
    
    const allItems = navStructure.flatMap(cat => cat.items);
    const currentModule = allItems.find(item => item.id === activeView);
    return currentModule ? currentModule.label : "SRM Hospital Information System";
  }

  const renderContent = () => {
    switch (activeView) {
      // Main Views
      case 'dashboard': return <DashboardView onPatientSelect={handlePatientSelect} />;
      case 'intern_dashboard': return <InternDashboardView />;
      case 'triage': return <TriageView />;
      case 'patient': return selectedPatient ? <PatientDetailView patient={selectedPatient} /> : <div className="p-8 text-center">Please select a patient.</div>;
      
      // Clinical Modules
      case 'module_1': return <RegistrationView />;
      case 'module_2': return <ComplaintPortalView />;
      case 'module_3': return <DigitalVitalsView />;
      case 'module_5': return <EPrescriptionView />;
      case 'module_6': return <PharmacyISView />;
      case 'module_7': return <DrugInfoView />;
      case 'module_8': return <LISView />;
      case 'module_9': return <DTISView />;
      case 'module_10': return <HospitalBillingView />;

      // Emergency & Legal
      case 'module_11': return <EmergencyCaseMgmtView />;
      case 'module_12': return <MLCSystemView />;
      case 'module_13': return <AMAWorkflowView />;
      case 'module_14': return <BroughtDeadRecordView />;
      // case 'module_15': return <AmbulanceDispatchView />;
      case 'module_16': return <SecurityLoggingView />;

      // Support & Facility
      case 'module_17': return <DietNutritionView />;
      case 'module_18': return <KitchenModuleView />;
      case 'module_19': return <FnBOrderView />;
      case 'module_20': return <PhysiotherapyView />;
      case 'module_21': return <OccupationalTherapyView />;
      case 'module_22': return <OTSchedulingView />;
      case 'module_23': return <ICUMonitoringView />;
      case 'module_24': return <WardManagementView />;
      case 'module_25': return <MHCView />;
      case 'module_26': return <NursingDeploymentView />;
      case 'module_27': return <DoctorsDeploymentView />;
      // case 'module_27b': return <BiomedicalEquipmentsView />;
      case 'module_28': return <MedicalGasTrackingView />;
      case 'module_29': return <PatientPorterView />;
      case 'module_30': return <PatientFeedbackView />;
      
      // Integration & Automation
      case 'module_31': return <OutsourcedTestView />;
      case 'module_32': return <DischargeTranscriptionView />;
      // case 'module_33': return <DischargeSummaryMgmtView patient={selectedPatient || mockPatients[0]} />;
      case 'module_34': return <ComplianceLicenseView />;
      case 'module_35': return <AVDocumentationView />;
      case 'module_36': return <HousekeepingWasteMgmtView />;
      case 'module_37': return <ComplaintsIssueTrackerView />;
      case 'module_38': return <ITManagementView />;
      case 'module_39': return <MortuaryRecordView />;
      case 'module_40': return <TransplantCaseMgmtView />;
      case 'module_41': return <CSSDWorkflowView />;
      case 'module_42': return <LaundryLinenView />;

      // Administrative & Financial
      case 'module_43': return <HRTrainingView />;
      case 'module_44': return <PerformanceReviewView />;
      case 'module_45': return <NarcoticsControlView />;
      case 'module_46': return <AccountsFinanceView />;
      case 'module_47': return <AccreditationMgmtView />;
      case 'module_48': return <QualityComplianceView />;
      case 'module_49': return <OperationsDashboardView />;
      case 'module_50': return <InsuranceClaimsView />;
      case 'module_51': return <CorporateTieupsView />;

      // Supply Chain & Prevention
      case 'module_52': return <GeneralPurchaseStoreView />;
      case 'module_53': return <MedicationErrorView />;
      case 'module_54': return <NCDPreventionChatbotView />;
      
      // System
      case 'settings': return <SettingsView />;
      case 'test-ai':
        return <TestAIFeatures />;
      default:
        return <div className="p-8 text-center font-bold text-xl text-red-500">Module not found!</div>;
    }
  };

  return (
    <div className="flex h-screen bg-srm-gray font-sans text-srm-darkgray">
      <Sidebar activeView={activeView} setActiveView={handleViewChange} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title={getHeaderTitle()} onLogout={onLogout} userRole={userRole} />
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

function App() {
  console.log('App - Total mock patients:', mockPatients.length);
  
  // Log department information
  const departmentCounts: Record<string, number> = {};
  mockPatients.forEach(patient => {
    if (patient.department) {
      departmentCounts[patient.department] = (departmentCounts[patient.department] || 0) + 1;
    }
  });
  console.log('App - Department counts:', departmentCounts);
  
  const [userRole, setUserRole] = useState<'doctor' | 'intern' | 'patient' | 'receptionist' | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loggedInPatient, setLoggedInPatient] = useState<Patient | null>(null);
    
    // Centralized state for appointments for live data flow.
    // This state acts as a single source of truth, simulating a live database.
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);

    // Centralized state for doctors for live data flow (booking slots).
    const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);

    // Initialize patients state from localStorage or mockData for persistence.
    const [patients, setPatients] = useState<Patient[]>(() => {
        try {
            const localData = localStorage.getItem('srm_patients');
            // If local data exists, parse it. Otherwise, use mockPatients.
            if (localData) {
                return JSON.parse(localData);
            }
        } catch (error) {
            console.error("Failed to parse patients from localStorage:", error);
        }
        // Fallback to mockPatients and save it to initialize localStorage.
        localStorage.setItem('srm_patients', JSON.stringify(mockPatients));
        return mockPatients;
    });

    // Effect to save patients to localStorage whenever the state changes.
    useEffect(() => {
        try {
            localStorage.setItem('srm_patients', JSON.stringify(patients));
        } catch (error) {
            console.error("Failed to save patients to localStorage:", error);
        }
    }, [patients]);

    const logPatientActivity = useCallback((patientId: string, action: string) => {
        const patient = patients.find(p => p.id === patientId);
        if (patient) {
            const newLog: ActivityLog = {
                id: `LOG${Date.now()}`,
                patientId: patient.id,
                patientName: patient.name,
                action,
                timestamp: new Date().toISOString(),
            };
            setActivityLog(prev => [newLog, ...prev]);
        }
    }, [patients]);

    const handleStaffLogin = (role: string) => {
        setUserRole(role);
        setLoggedInPatient(null);
    };

    const handlePatientLogin = (pid: string, password: string): Patient | null => {
        const patient = patients.find(p => p.id === pid);
        if (patient && patient.password && comparePassword(password, patient.password)) {
            setLoggedInPatient(patient);
            setUserRole('Patient');
            logPatientActivity(patient.id, "Patient Logged In");
            return patient;
        }
        return null;
    };
    
    const findPatientByPhone = (phoneNumber: string): Patient | null => {
        return patients.find(p => p.phoneNumber === phoneNumber) || null;
    }

    const handleResetPassword = (phoneNumber: string, newPassword: string): Patient | null => {
        let updatedPatient: Patient | null = null;
        setPatients(prev => prev.map(p => {
            if (p.phoneNumber === phoneNumber) {
                const updated = { ...p, password: hashPassword(newPassword) };
                updatedPatient = updated;
                return updated;
            }
            return p;
        }));
        if (updatedPatient) {
            logPatientActivity(updatedPatient.id, "Password Reset Successful");
        }
        return updatedPatient;
    };

    const handlePatientSignUp = (details: Omit<Patient, 'id' | 'triageInfo' | 'clinicalNotes' | 'prescriptions' | 'referrals' | 'bloodType'>): Patient => {
        const hashedPassword = details.password ? hashPassword(details.password) : undefined;
        
        const newPatient: Patient = {
            ...details,
            password: hashedPassword, // Store the hashed password
            id: generatePID(),
            bloodType: '', // Not collected in this flow
            status: 'REGISTERED',
            triageInfo: { // Default empty info for new patients
                chiefComplaint: 'New Patient Registration',
                risk: 'Low',
                riskScore: 10,
                triageDate: new Date().toISOString(),
            },
            clinicalNotes: 'Patient registered via online portal.',
            prescriptions: [],
            referrals: [],
            medicalHistory: { pastConditions: [], surgeries: [] },
        };
        setPatients(prev => [...prev, newPatient]);
        logPatientActivity(newPatient.id, "Patient Signed Up");
        return newPatient;
    };
    
    const handleWalkinRegistration = (details: Omit<Patient, 'id' | 'triageInfo' | 'clinicalNotes' | 'prescriptions' | 'referrals' | 'bloodType' | 'password' | 'dob' | 'medicalHistory'> & { symptoms: string, bp: string, temp: string, pulse: string, dob: string }): Patient => {
        const [systolic, diastolic] = details.bp.split('/').map(s => parseInt(s.trim(), 10));

        const initialVitalEntry: VitalSignEntry = {
            timestamp: new Date().toISOString(),
            temperature: parseFloat(details.temp) || 0,
            heartRate: parseInt(details.pulse, 10) || 0,
            respirationRate: 18, // Default respiration rate for walk-ins
            bloodPressure: {
                systolic: systolic || 0,
                diastolic: diastolic || 0,
            },
            symptomsSummary: details.symptoms,
        };
        
        // Split symptoms into array for the symptoms field
        const symptomsArray = details.symptoms.split(',').map(s => s.trim()).filter(s => s.length > 0);
        
        const newPatient: Patient = {
            ...details,
            id: generatePID(),
            bloodType: '',
            status: 'WAITING_FOR_INTERN',
            triageInfo: {
                chiefComplaint: details.symptoms,
                risk: 'Low', // Initial risk, can be re-assessed by intern
                riskScore: 20,
                triageDate: new Date().toISOString(),
            },
            clinicalNotes: `Walk-in registration.\nReported Symptoms: ${details.symptoms}`,
            prescriptions: [],
            referrals: [],
            medicalHistory: { pastConditions: [], surgeries: [] },
            vitals: [initialVitalEntry], // Add the structured initial vitals
            symptoms: symptomsArray, // Add symptoms array
        };
        setPatients(prev => [...prev, newPatient]);
        return newPatient;
    };

    const handleAddPrescription = (patientId: string, prescriptionData: Omit<PatientPrescription, 'id' | 'doctor'>, doctorName: string) => {
        setPatients(prevPatients => {
            return prevPatients.map(p => {
                if (p.id === patientId) {
                    const newPrescription: PatientPrescription = {
                        ...prescriptionData,
                        id: `RX${Math.floor(1000 + Math.random() * 9000)}`,
                        doctor: doctorName,
                    };
                    return {
                        ...p,
                        prescriptions: [...(p.prescriptions || []), newPrescription]
                    };
                }
                return p;
            });
        });
    };
    
    const handleAddVitals = (patientId: string, vitalsData: Omit<VitalSignEntry, 'timestamp'>) => {
        setPatients(prevPatients => {
            return prevPatients.map(p => {
                if (p.id === patientId) {
                    // Create the historical entry, ensuring NaN becomes 0 to satisfy the type.
                    const newVitalEntry: VitalSignEntry = {
                        timestamp: new Date().toISOString(),
                        temperature: isNaN(vitalsData.temperature) ? 0 : vitalsData.temperature,
                        heartRate: isNaN(vitalsData.heartRate) ? 0 : vitalsData.heartRate,
                        respirationRate: isNaN(vitalsData.respirationRate) ? 0 : vitalsData.respirationRate,
                        bloodPressure: {
                            systolic: isNaN(vitalsData.bloodPressure.systolic) ? 0 : vitalsData.bloodPressure.systolic,
                            diastolic: isNaN(vitalsData.bloodPressure.diastolic) ? 0 : vitalsData.bloodPressure.diastolic,
                        },
                        height: vitalsData.height, // Already handles undefined
                        weight: vitalsData.weight,
                        symptomsSummary: vitalsData.symptomsSummary,
                    };
                    
                    const clinicalNoteSummary = `BP: ${newVitalEntry.bloodPressure.systolic}/${newVitalEntry.bloodPressure.diastolic}, HR: ${newVitalEntry.heartRate}, Temp: ${newVitalEntry.temperature}, Resp: ${newVitalEntry.respirationRate}.`;
                    const vitalNote = `\n[${new Date().toISOString()}] Vitals update: ${clinicalNoteSummary} Notes: ${vitalsData.symptomsSummary || 'N/A'}`;

                    // Convert Celsius to Fahrenheit for the chart, only if a valid number was entered.
                    const temperatureF = !isNaN(vitalsData.temperature) ? (vitalsData.temperature * 9 / 5) + 32 : undefined;

                    // Update patient status to ensure it appears in intern queue
                    const updatedStatus = p.status === 'REGISTERED' ? 'WAITING_FOR_INTERN' : p.status;

                    return {
                        ...p,
                        status: updatedStatus,
                        // Update snapshot vitals for the VitalsChart, only if a valid number was entered.
                        temperature_F: temperatureF ? parseFloat(temperatureF.toFixed(1)) : p.temperature_F,
                        heart_rate_bpm: !isNaN(vitalsData.heartRate) ? vitalsData.heartRate : p.heart_rate_bpm,
                        respiration_rate: !isNaN(vitalsData.respirationRate) ? vitalsData.respirationRate : p.respiration_rate,
                        bp_systolic: !isNaN(vitalsData.bloodPressure.systolic) ? vitalsData.bloodPressure.systolic : p.bp_systolic,
                        bp_diastolic: !isNaN(vitalsData.bloodPressure.diastolic) ? vitalsData.bloodPressure.diastolic : p.bp_diastolic,
                        
                        // Keep historical data and clinical notes update
                        clinicalNotes: (p.clinicalNotes || '') + vitalNote,
                        vitals: [...(p.vitals || []), newVitalEntry]
                    };
                }
                return p;
            });
        });
    };

    const handleInternAssessment = (patientId: string, assessment: { notes: string; suspectedIssue: string; }) => {
        setPatients(prevPatients => 
            prevPatients.map(p => 
                p.id === patientId 
                ? { 
                    ...p, 
                    clinicalNotes: (p.clinicalNotes || '') + `

[Intern Assessment @ ${new Date().toLocaleTimeString()}]
Suspected Issue: ${assessment.suspectedIssue}
Notes: ${assessment.notes}`,
                  } 
                : p
            )
        );
    };
    
    const handleAssignDoctor = (patientId: string, doctorId: string) => {
        const doctor = doctors.find(d => d.id === doctorId);
        if (!doctor) return;
    
        setPatients(prevPatients => 
            prevPatients.map(p => {
                if (p.id === patientId) {
                    // Extract symptoms from the latest vitals entry if available
                    let symptoms: string[] = [];
                    if (p.vitals && p.vitals.length > 0) {
                        const latestVitals = p.vitals[p.vitals.length - 1];
                        if (latestVitals.symptomsSummary) {
                            // Split the symptoms summary into an array
                            symptoms = latestVitals.symptomsSummary.split(',').map(s => s.trim()).filter(s => s.length > 0);
                        }
                    }
                    
                    // If we don't have symptoms from vitals, check if patient already has symptoms
                    if (symptoms.length === 0 && p.symptoms) {
                        symptoms = p.symptoms;
                    }
                    
                    return { 
                        ...p, 
                        assignedDoctorId: doctorId, 
                        department: doctor.department, 
                        status: 'WAITING_FOR_DOCTOR',
                        symptoms: symptoms.length > 0 ? symptoms : p.symptoms
                    };
                }
                return p;
            })
        );
        
        // Create an appointment for the patient when assigned to a doctor
        const patient = patients.find(p => p.id === patientId);
        if (patient) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const newAppointment: Appointment = {
                id: `A${Math.floor(1000 + Math.random() * 9000)}`,
                patientId: patient.id,
                patientName: patient.name,
                doctor: doctor.name,
                department: doctor.department,
                date: tomorrow.toISOString().split('T')[0],
                time: '09:00 AM',
                symptoms: patient.vitals && patient.vitals.length > 0 ? 
                    patient.vitals[patient.vitals.length - 1].symptomsSummary || '' : '',
                status: 'Confirmed'
            };
            
            setAppointments(prev => [newAppointment, ...prev]);
        }
    };

    const handleBookAppointment = (details: Omit<Appointment, 'id' | 'status'>) => {
        const newAppointment: Appointment = {
            ...details,
            id: `A${Math.floor(1000 + Math.random() * 9000)}`,
            status: details.department === 'New Patient' ? 'PendingDoctorAssignment' : 'PendingApproval',
        };
        setAppointments(prev => [newAppointment, ...prev]);
        logPatientActivity(details.patientId, `Booked Appointment for ${details.department}`);
    };

    const handleUpdateAppointmentStatus = (appointmentId: string, status: 'Confirmed' | 'Cancelled') => {
        let updatedAppointment: Appointment | undefined;

        setAppointments(prev => prev.map(appt => {
            if (appt.id === appointmentId) {
                updatedAppointment = { ...appt, status };
                return updatedAppointment;
            }
            return appt;
        }));
        
        if (updatedAppointment) {
            const appointment = updatedAppointment;
            const message = status === 'Confirmed'
                ? `Your appointment for ${appointment.department} on ${new Date(appointment.date).toLocaleDateString('en-GB')} at ${appointment.time} has been confirmed.`
                : `Unfortunately, your appointment for ${appointment.department} on ${new Date(appointment.date).toLocaleDateString('en-GB')} at ${appointment.time} was rejected. Please contact the hospital to reschedule or book a new appointment.`;

            const newNotification: Notification = {
                id: `N${Date.now()}`,
                patientId: appointment.patientId,
                message,
                type: status === 'Confirmed' ? 'success' : 'error',
                timestamp: new Date().toISOString(),
                read: false,
            };
            setNotifications(prev => [newNotification, ...prev]);

            if (status === 'Confirmed') {
                setDoctors(prevDoctors => prevDoctors.map(doc => {
                    if (doc.name === appointment.doctor) {
                        const newBookedSlots = [...(doc.bookedSlots || []), { date: appointment.date, time: appointment.time }];
                        return { ...doc, bookedSlots: newBookedSlots };
                    }
                    return doc;
                }));
                
                // Update the patient's status to show up in the intern queue.
                setPatients(prevPatients => prevPatients.map(p => {
                    if (p.id === appointment.patientId) {
                        // Extract pregnancy status from symptoms
                        let updatedPatient = { ...p, status: 'WAITING_FOR_INTERN' };
                        
                        // Process symptoms to extract pregnancy status and populate symptoms array
                        if (appointment.symptoms) {
                            // Extract pregnancy status
                            if (p.gender === 'Female') {
                                if (appointment.symptoms.includes('Pregnancy Status: Yes')) {
                                    updatedPatient.isPregnant = true;
                                } else if (appointment.symptoms.includes('Pregnancy Status: No')) {
                                    updatedPatient.isPregnant = false;
                                }
                            }
                            
                            // Populate symptoms array from symptoms summary
                            const symptomsArray = appointment.symptoms.split(',').map(s => s.trim()).filter(s => s.length > 0);
                            updatedPatient.symptoms = symptomsArray;
                            
                            // Also update the triageInfo chief complaint
                            updatedPatient.triageInfo = {
                                ...updatedPatient.triageInfo,
                                chiefComplaint: appointment.symptoms
                            };
                        }
                        
                        return updatedPatient;
                    }
                    return p;
                }));
            }
        }
    };
    
    const handleAssignDoctorToAppointment = (appointmentId: string, doctorId: string) => {
        const doctor = doctors.find(d => d.id === doctorId);
        if (!doctor) return;

        let updatedAppointment: Appointment | undefined;

        setAppointments(prev => prev.map(appt => {
            if (appt.id === appointmentId) {
                updatedAppointment = { ...appt, status: 'Confirmed', doctor: doctor.name, department: doctor.department };
                return updatedAppointment;
            }
            return appt;
        }));

        if (updatedAppointment) {
             const appointment = updatedAppointment;
             const message = `A doctor has been assigned to your new patient appointment. Your appointment with ${doctor.name} (${doctor.department}) on ${new Date(appointment.date).toLocaleDateString('en-GB')} at ${appointment.time} is now confirmed.`;

             const newNotification: Notification = {
                id: `N${Date.now()}`,
                patientId: appointment.patientId,
                message,
                type: 'success',
                timestamp: new Date().toISOString(),
                read: false,
            };
            setNotifications(prev => [newNotification, ...prev]);

             setDoctors(prevDoctors => prevDoctors.map(doc => {
                if (doc.id === doctorId) {
                    const newBookedSlots = [...(doc.bookedSlots || []), { date: appointment.date, time: appointment.time }];
                    return { ...doc, bookedSlots: newBookedSlots };
                }
                return doc;
            }));

            // Update the patient's status to show up in the intern queue.
            setPatients(prevPatients => prevPatients.map(p => {
                if (p.id === appointment.patientId) {
                    // Extract pregnancy status from symptoms
                    let updatedPatient = { ...p, status: 'WAITING_FOR_INTERN' };
                    
                    // Process symptoms to extract pregnancy status and populate symptoms array
                    if (appointment.symptoms) {
                        // Extract pregnancy status
                        if (p.gender === 'Female') {
                            if (appointment.symptoms.includes('Pregnancy Status: Yes')) {
                                updatedPatient.isPregnant = true;
                            } else if (appointment.symptoms.includes('Pregnancy Status: No')) {
                                updatedPatient.isPregnant = false;
                            }
                        }
                        
                        // Populate symptoms array from symptoms summary
                        const symptomsArray = appointment.symptoms.split(',').map(s => s.trim()).filter(s => s.length > 0);
                        updatedPatient.symptoms = symptomsArray;
                        
                        // Also update the triageInfo chief complaint
                        updatedPatient.triageInfo = {
                            ...updatedPatient.triageInfo,
                            chiefComplaint: appointment.symptoms
                        };
                    }
                    
                    return updatedPatient;
                }
                return p;
            }));
        }
    };
    
    const handleMarkNotificationsAsRead = (patientId: string) => {
        setNotifications(prev =>
            prev.map(n =>
                (n.patientId === patientId && !n.read) ? { ...n, read: true } : n
            )
        );
    };

    const handleLogout = () => {
        if (loggedInPatient) {
            logPatientActivity(loggedInPatient.id, "Patient Logged Out");
        }
        setUserRole(null);
        setLoggedInPatient(null);
    };
    
    if (!userRole && !loggedInPatient) {
        return <LoginView onStaffLogin={handleStaffLogin} onPatientLogin={handlePatientLogin} onPatientSignUp={handlePatientSignUp} onFindPatientByPhone={findPatientByPhone} onResetPassword={handleResetPassword} />;
    }

    if (userRole === 'Patient' && loggedInPatient) {
        const currentPatientState = patients.find(p => p.id === loggedInPatient.id) || loggedInPatient;
        const patientAppointments = appointments.filter(a => a.patientId === currentPatientState.id);
        const patientNotifications = notifications.filter(n => n.patientId === currentPatientState.id);
        
        return <PatientDashboard 
                    patient={currentPatientState} 
                    doctors={doctors}
                    appointments={patientAppointments}
                    notifications={patientNotifications}
                    onLogout={handleLogout} 
                    onBookAppointment={handleBookAppointment} 
                    onMarkNotificationsAsRead={() => handleMarkNotificationsAsRead(currentPatientState.id)}
                    logPatientActivity={logPatientActivity}
                />;
    }
    
    if (userRole === 'Receptionist') {
      return <ReceptionistDashboard 
        onLogout={handleLogout} 
        userRole={userRole}
        patients={patients}
        appointments={appointments}
        doctors={doctors}
        activityLog={activityLog}
        onAddPatient={handleWalkinRegistration}
        onAddVitals={handleAddVitals}
        onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
        onAssignDoctorToAppointment={handleAssignDoctorToAppointment}
       />;
    }

    if (userRole === 'Intern') {
        const supervisingDoctor = doctors[0]; // Assume Dr. Evelyn Reed
        return <InternDashboard
            onLogout={handleLogout}
            userRole={userRole}
            patients={patients}
            doctors={doctors}
            onAddVitals={handleAddVitals}
            onAssignDoctor={handleAssignDoctor}
            onInternAssessment={handleInternAssessment}
            onAddPrescription={(patientId, prescriptionData) => handleAddPrescription(patientId, prescriptionData, supervisingDoctor.name)}
        />;
    }

    if (userRole === 'Doctor') {
        const loggedInDoctor = { id: 'DOC001', name: 'Dr. Evelyn Reed' };
        return <DoctorDashboard
            onLogout={handleLogout}
            userRole={userRole}
            doctor={loggedInDoctor}
            patients={patients}
            doctors={doctors}
            onAddPrescription={(patientId, prescriptionData) => handleAddPrescription(patientId, prescriptionData, loggedInDoctor.name)}
        />;
    }

    if (userRole === 'Nurse') {
        // Mock bed data - in a real app, this would come from a service
        const mockBeds: WardBed[] = [
            { id: 'W1-B01', ward: 'Cardiology', bedNumber: '01', patientName: null, status: 'Available' },
            { id: 'W1-B02', ward: 'Cardiology', bedNumber: '02', patientName: null, status: 'Available' },
            { id: 'W2-B01', ward: 'General Medicine', bedNumber: '01', patientName: null, status: 'Available' },
            { id: 'W2-B02', ward: 'General Medicine', bedNumber: '02', patientName: null, status: 'Available' },
            { id: 'W3-B01', ward: 'Orthopedics', bedNumber: '01', patientName: null, status: 'Available' },
            { id: 'W3-B02', ward: 'Orthopedics', bedNumber: '02', patientName: null, status: 'Available' },
        ];
        
        return <NurseDashboard
            onLogout={handleLogout}
            userRole={userRole}
            patients={patients}
            beds={mockBeds}
            onAssignBed={(patientId, bedId) => {
                console.log(`Assigning patient ${patientId} to bed ${bedId}`);
                // In a real app, this would update the bed status and patient assignment
            }}
            onDischargePatient={(patientId) => {
                console.log(`Discharging patient ${patientId}`);
                // In a real app, this would update the patient status
            }}
        />;
    }

    if (userRole && userRole !== 'Patient' && userRole !== 'Receptionist' && userRole !== 'Doctor' && userRole !== 'Intern' && userRole !== 'Nurse') {
      return <HisSuite onLogout={handleLogout} userRole={userRole} />;
    }

    // Fallback in case of inconsistent state
    return <LoginView onStaffLogin={handleStaffLogin} onPatientLogin={handlePatientLogin} onPatientSignUp={handlePatientSignUp} onFindPatientByPhone={findPatientByPhone} onResetPassword={handleResetPassword} />;
};

export default App;