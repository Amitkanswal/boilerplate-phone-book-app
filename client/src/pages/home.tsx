import { useState } from "react";
import { Contact, InsertContact } from "@shared/schema";
import { useContacts } from "@/hooks/use-contacts";
import { AddContactForm } from "@/components/add-contact-form";
import { EditContactForm } from "@/components/edit-contact-form";
import { DeleteConfirm } from "@/components/delete-confirm";
import { SortDropdown } from "@/components/sort-dropdown";
import { EmptyState } from "@/components/empty-state";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { 
    contacts, 
    totalCount, 
    searchTerm, 
    setSearchTerm, 
    sortOption, 
    setSortOption, 
    isLoading,
    error,
    addContact, 
    updateContact, 
    deleteContact 
  } = useContacts();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleEditClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    const contact = contacts.find(c => c.id === id) || null;
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleAddContact = async (data: InsertContact) => {
    const success = await addContact(data);
    if (success) {
      setIsAddModalOpen(false);
    }
  };

  const handleUpdateContact = (data: InsertContact) => {
    if (selectedContact) {
      const success = updateContact(selectedContact.id, data);
      if (success) {
        setIsEditModalOpen(false);
      }
    }
  };

  const handleConfirmDelete = () => {
    if (selectedContact) {
      const success = deleteContact(selectedContact.id);
      if (success) {
        setIsDeleteModalOpen(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="bg-card border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center">
              <i className="ri-contacts-book-2-line text-2xl text-primary mr-2"></i>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Phone Directory</h1>
            </div>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading contacts...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="bg-card border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center">
              <i className="ri-contacts-book-2-line text-2xl text-primary mr-2"></i>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Phone Directory</h1>
            </div>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
          <div className="text-center max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 mx-auto mb-4">
              <i className="ri-error-warning-line text-xl text-rose-600 dark:text-rose-400"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Error Loading Contacts</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          </div>
        </main>
      </div>
    );
  }
  

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-card border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <i className="ri-contacts-book-2-line text-2xl text-primary mr-2"></i>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Phone Directory</h1>
          </div>
          
          <div className="flex flex-1 max-w-md gap-2">
            <div className="relative flex-1">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
              <Input 
                type="text" 
                placeholder="Search contacts..." 
                className="search-input w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <SortDropdown 
              sortOption={sortOption} 
              onSortChange={setSortOption} 
            />
            
            <ThemeToggle />
          </div>
          
          <button 
            className="icon-btn bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center shadow-sm transition-colors"
            onClick={() => setIsAddModalOpen(true)}
          >
            <i className="ri-add-line mr-1"></i>
            Add Contact
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {totalCount === 0 ? (
          <EmptyState onAddClick={() => setIsAddModalOpen(true)} />
        ) : (
          <div id="contactsContainer">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">All Contacts</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
            
            {contacts.length === 0 && searchTerm ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No contacts found matching "{searchTerm}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"/>
            )}
          </div>
        )}
      </main>

      <AddContactForm 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSubmit={handleAddContact} 
      />

      <EditContactForm 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSubmit={handleUpdateContact} 
        contact={selectedContact} 
      />

      <DeleteConfirm 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
}
