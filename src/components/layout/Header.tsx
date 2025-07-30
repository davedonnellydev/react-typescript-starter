import React from 'react';
import { BaseComponentProps } from '../../types/common';
import styles from './Header.module.css';

interface HeaderProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Daily Project',
  subtitle,
  showBackButton = false,
  onBackClick,
  className = '',
}) => {
  const headerClasses = [styles.header, className].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            {showBackButton && (
              <button
                onClick={onBackClick}
                className={styles.backButton}
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div>
              <h1 className={styles.title}>{title}</h1>
              {subtitle && (
                <p className={styles.subtitle}>{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;