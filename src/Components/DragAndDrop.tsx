import React from 'react';

interface DragAndDropProps {
  children: React.ReactNode;
  handleDrop: (files: FileList) => void;
}

export const DragAndDrop = (props: DragAndDropProps) => {
  const dropRef = React.createRef<HTMLDivElement>();
  const [isDragging, setIsDragging] = React.useState(false);
  const [depthOfNestedCalls, setDepthOfNestedCalls] = React.useState(0);

  React.useEffect(() => {
    const div = dropRef.current;
    div?.addEventListener('dragenter', handleDragIn);
    div?.addEventListener('dragleave', handleDragOut);
    div?.addEventListener('dragover', handleDragOver);
    div?.addEventListener('drop', handleDrop);

    return function cleanUp() {
      div?.removeEventListener('dragenter', handleDragIn);
      div?.removeEventListener('dragleave', handleDragOut);
      div?.removeEventListener('dragover', handleDragOver);
      div?.removeEventListener('drop', handleDrop);
    };
  });

  React.useEffect(() => {
    if (depthOfNestedCalls === 0) {
      setIsDragging(false);
    }
  }, [depthOfNestedCalls]);

  const handleDragIn = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDepthOfNestedCalls(depthOfNestedCalls + 1);

    if (e.dataTransfer?.items && e.dataTransfer?.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOut = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDepthOfNestedCalls(depthOfNestedCalls - 1);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    if (e.dataTransfer?.files && e.dataTransfer?.files.length > 0) {
      props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDepthOfNestedCalls(0);
    }
  };

  return (
    <div
      ref={dropRef}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      {isDragging && (
        <div
          style={{
            border: 'dashed grey 4px',
            backgroundColor: 'rgba(255,255,255,.8)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              left: 0,
              textAlign: 'center',
              color: 'grey',
              fontSize: 36,
            }}
          >
            <div>drop here~</div>
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
};
