import React from 'react';

export const AnalyticsView: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-srm-darkgray">Analytics & Reports</h3>
                <p className="text-gray-500 mt-1">Comprehensive analytics and reporting for clinical and operational insights.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-500">Patient Outcomes</p>
                    <p className="text-2xl font-bold text-srm-darkgray mt-1">92.4%</p>
                    <p className="text-xs text-green-600 mt-2">+2.1% improvement</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-500">Avg. Length of Stay</p>
                    <p className="text-2xl font-bold text-srm-darkgray mt-1">4.2 days</p>
                    <p className="text-xs text-green-600 mt-2">-0.3 days</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-500">Readmission Rate</p>
                    <p className="text-2xl font-bold text-srm-darkgray mt-1">8.7%</p>
                    <p className="text-xs text-red-600 mt-2">+1.2% increase</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-500">Patient Satisfaction</p>
                    <p className="text-2xl font-bold text-srm-darkgray mt-1">4.7/5</p>
                    <p className="text-xs text-green-600 mt-2">+0.2 points</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h4 className="font-semibold text-lg text-srm-darkgray mb-4">Patient Volume Trend</h4>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Chart visualization would appear here</p>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h4 className="font-semibold text-lg text-srm-darkgray mb-4">Department Performance</h4>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Cardiology</span>
                                <span className="text-sm font-medium text-gray-700">94.2%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: '94.2%'}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Neurology</span>
                                <span className="text-sm font-medium text-gray-700">89.7%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{width: '89.7%'}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Orthopedics</span>
                                <span className="text-sm font-medium text-gray-700">91.5%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-yellow-600 h-2 rounded-full" style={{width: '91.5%'}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">General Medicine</span>
                                <span className="text-sm font-medium text-gray-700">87.3%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{width: '87.3%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h4 className="font-semibold text-lg text-srm-darkgray mb-4">Recent Reports</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center mb-2">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h5 className="font-medium">Monthly Summary</h5>
                        </div>
                        <p className="text-sm text-gray-600">July 2024 performance report</p>
                        <p className="text-xs text-gray-500 mt-2">Generated 2 days ago</p>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center mb-2">
                            <div className="bg-green-100 p-2 rounded-lg mr-3">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h5 className="font-medium">Financial Report</h5>
                        </div>
                        <p className="text-sm text-gray-600">Q2 2024 financial analysis</p>
                        <p className="text-xs text-gray-500 mt-2">Generated 1 week ago</p>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center mb-2">
                            <div className="bg-purple-100 p-2 rounded-lg mr-3">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h5 className="font-medium">Quality Metrics</h5>
                        </div>
                        <p className="text-sm text-gray-600">Patient safety and quality indicators</p>
                        <p className="text-xs text-gray-500 mt-2">Generated 3 days ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
};