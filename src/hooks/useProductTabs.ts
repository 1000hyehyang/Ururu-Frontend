import { useState } from 'react';

export const useProductTabs = (initialTab = 0) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return {
    activeTab,
    handleTabChange,
  };
};
