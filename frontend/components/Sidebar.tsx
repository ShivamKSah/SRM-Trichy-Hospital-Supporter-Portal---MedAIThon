
import React, { useState } from 'react';
import type { View, NavItemType } from '../types';
import { navStructure } from '../navigation';
import { ChevronDownIcon } from './icons';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  item: NavItemType;
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => {
  const { icon: Icon, label } = item;
  const baseClasses = "flex items-center w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200";
  const activeClasses = "bg-srm-lightblue text-srm-blue";
  const inactiveClasses = "text-white hover:bg-white/20";
  
  return (
    <li>
      <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
        <span className="flex-grow">{label}</span>
      </button>
    </li>
  );
};

const NavCategory: React.FC<{
    category: string;
    icon: React.ElementType;
    children: React.ReactNode;
}> = ({ category, icon: Icon, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors"
            >
                <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-3"/>
                    <span>{category}</span>
                </div>
                <ChevronDownIcon className={`h-5 w-5 transform transition-transform ${isOpen ? '' : '-rotate-90'}`} />
            </button>
            {isOpen && <div className="mt-1 pl-4 border-l border-white/20 ml-6">{children}</div>}
        </div>
    );
}


export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-72 bg-srm-blue text-white flex flex-col flex-shrink-0">
      <div className="h-20 flex items-center justify-center px-4 border-b border-white/20">
        <h1 className="text-xl font-bold tracking-wider">SRM System</h1>
      </div>
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul className="space-y-4">
            {navStructure.map(({category, icon, items}) => (
                <li key={category}>
                    <NavCategory category={category} icon={icon}>
                        <ul className="space-y-1 py-2">
                           {items.map(item => (
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
            ))}
        </ul>
      </nav>
    </aside>
  );
};
