# ESG Classification Tool

A web application that classifies Vietnamese AGM resolutions into ESG (Environmental, Social, Governance) categories using OpenAI's GPT-4.

## Features

- **Authentication**: Simple login system with hardcoded credentials
- **Text Input**: Paste Vietnamese AGM resolution text for classification
- **AI Classification**: Uses OpenAI GPT-4 to classify resolutions into 6 ESG categories
- **Results Display**: Clean table view of classified items
- **CSV Export**: Download results as CSV file
- **Raw Text Export**: Download original input text
- **Clean Design**: Minimalist UI with sustainability theme using Tailwind CSS

## ESG Categories

The tool classifies resolutions into these Vietnamese categories:

1. **Tài chính & Kiểm toán** (Finance & Audit)
2. **Môi trường & Xã hội (E&S)** (Environment & Social)
3. **Quản trị & Tuân thủ** (Governance & Compliance)
4. **Thù lao** (Compensation)
5. **Hoạt động** (Operations)
6. **Đầu tư chiến lược** (Strategic Investment)

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

- **Username**: `admin`
- **Password**: `esg2024`

## Usage

1. **Login** with the demo credentials
2. **Input Page**: 
   - Enter a report title
   - Paste Vietnamese AGM resolution text
   - Click "Classify ESG"
3. **Output Page**:
   - Review classification results
   - Download CSV file
   - Download raw text file

## Deployment

### Vercel Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Go to project Settings → Environment Variables
   - Add `OPENAI_API_KEY` with your OpenAI API key
   - Select all environments (Production, Preview, Development)
   - Redeploy your project

### Environment Variables for Production

Set these in your Vercel dashboard:
- `OPENAI_API_KEY`: Your OpenAI API key

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS (pure CSS, no UI library dependencies)
- **CSV Export**: PapaParse
- **AI Integration**: OpenAI GPT-4 (server-side API route)
- **Deployment**: Vercel

## File Structure

```
├── app/
│   ├── api/
│   │   └── classify/
│   │       └── route.js
│   ├── components/
│   │   ├── LoginPage.js
│   │   ├── InputPage.js
│   │   └── OutputPage.js
│   ├── utils/
│   │   ├── openai.js
│   │   └── export.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── schema.js
├── package.json
├── tailwind.config.js
├── next.config.js
└── vercel.json
```

## API Integration

The app uses a Next.js API route (`/api/classify`) to securely handle OpenAI GPT-4 integration. The server-side API route:

- **Keeps API keys secure** (not exposed to client-side)
- **Handles OpenAI requests** server-side only
- **Includes detailed classification prompts** with Vietnamese category definitions
- **Provides fallback mock data** for development
- **Returns structured JSON** for client consumption

## Error Handling

- Input validation with user-friendly messages
- API error handling with fallback to mock data
- Loading states and progress indicators
- Snackbar notifications for user feedback

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- CSV download works across all browsers
- No external dependencies for file downloads

## License

This project is for educational and demonstration purposes.
