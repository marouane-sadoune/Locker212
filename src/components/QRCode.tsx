import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
}

// Simple QR code generator using a grid pattern (decorative)
export const QRCode: React.FC<QRCodeProps> = ({ value, size = 120 }) => {
  // Generate a deterministic pattern based on the value
  const generatePattern = (str: string): boolean[][] => {
    const gridSize = 21;
    const pattern: boolean[][] = [];
    let hash = 0;
    
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    
    for (let i = 0; i < gridSize; i++) {
      pattern[i] = [];
      for (let j = 0; j < gridSize; j++) {
        // Position detection patterns (corners)
        const isCorner = (
          (i < 7 && j < 7) || // Top-left
          (i < 7 && j >= gridSize - 7) || // Top-right
          (i >= gridSize - 7 && j < 7) // Bottom-left
        );
        
        if (isCorner) {
          // Create the finder pattern
          const cornerI = i < 7 ? i : i - (gridSize - 7);
          const cornerJ = j < 7 ? j : j >= gridSize - 7 ? j - (gridSize - 7) : j;
          
          if (cornerI === 0 || cornerI === 6 || cornerJ === 0 || cornerJ === 6) {
            pattern[i][j] = true;
          } else if (cornerI >= 2 && cornerI <= 4 && cornerJ >= 2 && cornerJ <= 4) {
            pattern[i][j] = true;
          } else {
            pattern[i][j] = false;
          }
        } else {
          // Generate pseudo-random pattern for data
          const seed = (hash + i * gridSize + j) % 100;
          pattern[i][j] = seed > 45;
        }
      }
    }
    
    return pattern;
  };

  const pattern = generatePattern(value);
  const cellSize = size / 21;

  return (
    <div 
      className="bg-white p-2"
      style={{ width: size + 16, height: size + 16 }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {pattern.map((row, i) =>
          row.map((cell, j) =>
            cell && (
              <rect
                key={`${i}-${j}`}
                x={j * cellSize}
                y={i * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#080808"
              />
            )
          )
        )}
      </svg>
    </div>
  );
};

