import React, { useState } from 'react';
import { 
  FileText, 
  Scissors, 
  Download,
  ChevronDown,
  Upload,
  Settings,
  ArrowLeft,
  Menu
} from 'lucide-react';

// File Uploader Component
const FileUploader = ({ onFilesSelected, accept, multiple }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-xl p-8 text-center
        ${isDragging 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }
        transition-all duration-300
      `}
    >
      <div className="flex flex-col items-center">
        <div className={`
          w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4
          ${isDragging ? 'animate-bounce' : ''}
        `}>
          <Upload className={`
            w-8 h-8 
            ${isDragging ? 'text-blue-600' : 'text-gray-400'}
          `} />
        </div>
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drop your files here
        </p>
        <p className="text-gray-500 mb-4">
          or click to select files
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Settings className="w-4 h-4" />
          <span>Supports PDF, Word, Excel, PowerPoint, and Images</span>
        </div>
      </div>
    </div>
  );
};

// File List Component
const FileList = ({ files, onRemove }) => {
  return (
    <div className="space-y-2">
      {files.map((file, index) => (
        <div 
          key={index}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-700">{file.name}</span>
          </div>
          <button
            onClick={() => onRemove(index)}
            className="text-gray-400 hover:text-red-500"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

// Main App Component
const PDFProcessor = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tools = [
    { 
      id: 'merge', 
      name: 'Merge PDF', 
      icon: <FileText className="w-6 h-6" />,
      description: 'Combine multiple PDFs into one file'
    },
    { 
      id: 'split', 
      name: 'Split PDF', 
      icon: <Scissors className="w-6 h-6" />,
      description: 'Separate one PDF into multiple files'
    },
    { 
      id: 'compress', 
      name: 'Compress PDF', 
      icon: <Download className="w-6 h-6" />,
      description: 'Reduce PDF file size while maintaining quality'
    }
  ];

  const handleToolSelect = (toolId) => {
    setCurrentPage(toolId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center"
              >
                <FileText className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PDF Tools
                </span>
              </button>
              
              <div className="hidden md:flex space-x-2">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleToolSelect(tool.id)}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    {tool.name}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg p-4">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                handleToolSelect(tool.id);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
            >
              {tool.name}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {currentPage === 'home' ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transform Your PDFs
              </h1>
              <p className="text-xl text-gray-600">
                Easy-to-use tools for all your PDF needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolSelect(tool.id)}
                  className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      {tool.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                    <p className="text-sm text-gray-500">{tool.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <FileUploader 
              onFilesSelected={(files) => {
                console.log('Files selected:', files);
                // Handle file selection
              }}
              accept=".pdf"
              multiple={true}
            />
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {tools.find(t => t.id === currentPage)?.name}
            </h2>
            
            <FileUploader 
              onFilesSelected={(files) => {
                console.log('Files selected:', files);
                // Handle file selection for specific tool
              }}
              accept=".pdf"
              multiple={currentPage === 'merge'}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default PDFProcessor;
