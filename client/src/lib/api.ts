import { getContactsFromStorage, saveContactsToStorage } from "@/lib/utils";
import { Contact, InsertContact } from "@shared/schema";

interface UserApiResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
}


export async function addContact(contact: InsertContact): Promise<Contact | null> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    
    const data = await response.json();
    const newContact: Contact = {
      ...contact,
      id: data.id,
      email: contact.email ?? null,
    };
    
    const contacts = getContactsFromStorage();
    const updatedContacts = [...contacts, newContact];
    saveContactsToStorage(updatedContacts);
    
    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error);
    return null;
  }
}

export async function updateContact(id: number, contact: InsertContact): Promise<Contact | null> {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const contacts = getContactsFromStorage();
    const existingIndex = contacts.findIndex(c => c.id === id);
    
    if (existingIndex === -1) {
      return null;
    }
    
    const updatedContact: Contact = {
      ...contact,
      id,
      email: contact.email ?? null,
      category: contact.category ?? 'personal'
    };
    
    const updatedContacts = [...contacts];
    updatedContacts[existingIndex] = updatedContact;
    
    saveContactsToStorage(updatedContacts);
    
    return updatedContact;
  } catch (error) {
    console.error('Error updating contact:', error);
    return null;
  }
}

export async function deleteContact(id: number): Promise<boolean> {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const contacts = getContactsFromStorage();
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    
    saveContactsToStorage(updatedContacts);
    
    return true;
  } catch (error) {
    console.error('Error deleting contact:', error);
    return false;
  }
}