import React from 'react';

const ComponentRenderer = ({ component }) => {
  if (!component) return null;

  // Handle text nodes
  if (component.type === 'textnode') {
    return component.content;
  }

  // Handle link components
  if (component.type === 'link') {
    return (
      <a
        href={component.attributes?.href || '#'}
        title={component.attributes?.title}
        className={component.classes?.join(' ')}
      >
        {component.components?.map((child, i) => (
          <ComponentRenderer key={i} component={child} />
        ))}
      </a>
    );
  }

  // Handle regular elements
  const Tag = component.tagName || 'div';
  
  return (
    <Tag 
      className={component.classes?.join(' ')}
    >
      {component.components?.map((child, i) => (
        <ComponentRenderer key={i} component={child} />
      ))}
    </Tag>
  );
};

const PageRenderer = ({ data }) => {
  if (!data) return null;

  try {
    // Parse the data if it's a string
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

    return (
      <div>
        {parsedData.components?.map((component, index) => (
          <ComponentRenderer key={index} component={component} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error rendering page:', error);
    return <div>Error rendering content</div>;
  }
};

export default PageRenderer;