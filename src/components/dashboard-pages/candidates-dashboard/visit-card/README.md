# Visit Card Generator

A modern, double-sided visit card generator for the candidates dashboard.

## Features

- **Double-sided Design**: Front and back sides with different layouts
- **Company Information**: Comprehensive company details including logo, contact info, and services
- **Edit Mode**: Form-based editing of all company information
- **Preview Mode**: Real-time preview of the visit card with flip animation
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Beautiful gradients and smooth animations

## Components

### VisitCardPage (Main Component)
- Main container with dashboard layout
- Toggle between edit and preview modes
- Manages company data state

### VisitCardGenerator
- Form for editing company information
- Fields for company details, address, services, and social media
- Dynamic service management (add/remove services)

### VisitCardPreview
- Interactive preview of the visit card
- Flip animation between front and back sides
- Download functionality (placeholder for now)

## Usage

1. Navigate to "Your Visit Card" in the candidates dashboard sidebar
2. Use "Edit Mode" to fill in company information
3. Switch to "Preview Mode" to see the final visit card
4. Click "Show Front" or "Show Back" to view different sides
5. Use "Download Card" to save the visit card (functionality to be implemented)

## Data Structure

The visit card stores the following company information:

```javascript
{
  companyName: string,
  logo: string (URL),
  tagline: string,
  industry: string,
  founded: string,
  employees: string,
  website: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
  description: string,
  services: string[],
  socialMedia: {
    linkedin: string,
    twitter: string,
    facebook: string,
    instagram: string
  }
}
```

## Styling

The component uses custom SCSS with:
- Modern gradient backgrounds
- Smooth transitions and animations
- Responsive design breakpoints
- Card-based layout with shadows
- Professional color scheme

## Future Enhancements

- PDF generation and download
- Multiple card templates/themes
- QR code integration
- Social media sharing
- Print-friendly layouts
- Data persistence and API integration
