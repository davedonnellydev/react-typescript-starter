import React, { useState } from 'react';
import Header from './components/layout/Header';
import Card from './components/common/Card';
import Button from './components/common/Button';
import Input from './components/common/Input';
import { useApi } from './hooks/useApi';
import { formatDate } from './utils/helpers';
import styles from './App.module.css';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Example API call using the custom hook
  const { data, isLoading, error, execute } = useApi('get', '/api/example');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      execute({ q: searchTerm });
    }
  };

  return (
    <div className={`${styles.app} App`}>
      <Header
        title="React TypeScript Starter"
        subtitle="Ready for daily projects"
      />

      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Component Examples */}
          <Card title="Component Examples" subtitle="Reusable UI components">
            <div className={styles.spaceY4}>
              <Input
                label="Text Input"
                placeholder="Enter some text..."
                value={inputValue}
                onChange={setInputValue}
              />

              <div className={`${styles.flex} ${styles.spaceX2}`}>
                <Button onClick={() => alert('Primary button clicked!')}>
                  Primary
                </Button>
                <Button variant="secondary" onClick={() => alert('Secondary button clicked!')}>
                  Secondary
                </Button>
                <Button variant="danger" onClick={() => alert('Danger button clicked!')}>
                  Danger
                </Button>
              </div>

              <div className={`${styles.flex} ${styles.spaceX2}`}>
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
              </div>

              <Button loading={isLoading} onClick={handleSearch}>
                {isLoading ? 'Loading...' : 'Search API'}
              </Button>
            </div>
          </Card>

          {/* API Example */}
          <Card title="API Integration" subtitle="Using the custom useApi hook">
            <div className={styles.spaceY4}>
              <Input
                label="Search"
                placeholder="Enter search term..."
                value={searchTerm}
                onChange={setSearchTerm}
              />

              {error && (
                <div className={styles.errorContainer}>
                  <p className={styles.errorText}>{error}</p>
                </div>
              )}

              {data && (
                <div className={styles.successContainer}>
                  <p className={styles.successText}>
                    API Response: {JSON.stringify(data, null, 2)}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Utility Examples */}
          <Card title="Utility Functions" subtitle="Helper functions for common tasks">
            <div className={styles.spaceY2}>
              <p className={styles.textSm}><strong>Date:</strong> {formatDate(new Date())}</p>
              <p className={styles.textSm}><strong>Capitalized:</strong> {inputValue ? inputValue.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Enter text above'}</p>
              <p className={styles.textSm}><strong>Truncated:</strong> {inputValue ? inputValue.length > 20 ? inputValue.slice(0, 20) + '...' : inputValue : 'Enter text above'}</p>
            </div>
          </Card>

          {/* Project Info */}
          <Card title="Project Structure" subtitle="What's included in this starter">
            <div className={styles.spaceY2}>
              <p className={styles.textSm}>✅ TypeScript with strict mode</p>
              <p className={styles.textSm}>✅ React 19 with modern hooks</p>
              <p className={styles.textSm}>✅ API integration with axios</p>
              <p className={styles.textSm}>✅ Reusable UI components</p>
              <p className={styles.textSm}>✅ Custom hooks for API calls</p>
              <p className={styles.textSm}>✅ Utility functions</p>
              <p className={styles.textSm}>✅ Environment variable support</p>
              <p className={styles.textSm}>✅ Jest testing setup</p>
              <p className={styles.textSm}>✅ Prettier code formatting</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;
