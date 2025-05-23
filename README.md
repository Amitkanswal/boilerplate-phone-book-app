# Phone Directory Application

A modern, responsive phone directory application built with React, TypeScript, and TailwindCSS. This application allows users to manage their contacts with features for adding, editing, deleting, searching, and sorting contacts.

![Phone Directory App](./shared//images/mockend.svg)

## Features

- **Contact Management**: Add, edit, and delete contacts
- **Rich Contact Information**: Store name, phone number, email, and categorize contacts
- **Search Functionality**: Quickly find contacts by name, phone number, or email
- **Sort Options**: Sort contacts by name (A-Z or Z-A) or recently added
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Form Validation**: Ensures data integrity with proper validation
- **Offline Capability**: Stores contacts in local storage for offline access

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Routing**: Wouter (lightweight routing)
- **State Management**: React Query and React Hooks
- **Styling**: TailwindCSS with shadcn/ui components
- **Form Handling**: React Hook Form with Zod validation
- **API Integration**: Fetch API with JSONPlaceholder for demo data
- **Icons**: Remix Icon set

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/phone-directory-app.git
   cd phone-directory-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
client/
├── src/
│   ├── components/       # UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and API calls
│   ├── pages/            # Page components
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
└── index.html            # HTML template
shared/
└── schema.ts             # Shared data schemas and types
```

## Usage

### Adding a Contact

1. Click the "Add Contact" button in the header
2. Fill in the contact details: name, phone number, email (optional), and category
3. Click "Save" to add the contact to your directory

### Searching for Contacts

- Use the search bar in the header to filter contacts by name, phone number, or email
- Results update in real-time as you type

### Sorting Contacts

- Click the sort dropdown next to the search bar
- Select your preferred sorting method: A-Z, Z-A, or Recently Added

### Editing or Deleting Contacts

- Click on a contact card to view options
- Select "Edit" to modify the contact details
- Select "Delete" to remove the contact from your directory

## Development

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
- [Remix Icons](https://remixicon.com/)

---