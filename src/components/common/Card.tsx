import React from 'react';
import { BaseComponentProps } from '../../types/common';
import styles from './Card.module.css';

interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  padding = 'medium',
  shadow = 'medium',
  className = '',
}) => {
  const cardClasses = [
    styles.card,
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    styles[`shadow${shadow.charAt(0).toUpperCase() + shadow.slice(1)}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && (
            <h3 className={styles.title}>{title}</h3>
          )}
          {subtitle && (
            <p className={styles.subtitle}>{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;