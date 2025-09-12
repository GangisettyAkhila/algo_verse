import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SpinWheel = ({ onSpin, isSpinning, result, className = '' }) => {
  const wheelRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  const segments = [
    { number: 0, color: 'bg-success', textColor: 'text-white' },
    { number: 32, color: 'bg-error', textColor: 'text-white' },
    { number: 15, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 19, color: 'bg-error', textColor: 'text-white' },
    { number: 4, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 21, color: 'bg-error', textColor: 'text-white' },
    { number: 2, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 25, color: 'bg-error', textColor: 'text-white' },
    { number: 17, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 34, color: 'bg-error', textColor: 'text-white' },
    { number: 6, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 27, color: 'bg-error', textColor: 'text-white' },
    { number: 13, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 36, color: 'bg-error', textColor: 'text-white' },
    { number: 11, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 30, color: 'bg-error', textColor: 'text-white' },
    { number: 8, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 23, color: 'bg-error', textColor: 'text-white' },
    { number: 10, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 5, color: 'bg-error', textColor: 'text-white' },
    { number: 24, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 16, color: 'bg-error', textColor: 'text-white' },
    { number: 33, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 1, color: 'bg-error', textColor: 'text-white' },
    { number: 20, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 14, color: 'bg-error', textColor: 'text-white' },
    { number: 31, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 9, color: 'bg-error', textColor: 'text-white' },
    { number: 22, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 18, color: 'bg-error', textColor: 'text-white' },
    { number: 29, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 7, color: 'bg-error', textColor: 'text-white' },
    { number: 28, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 12, color: 'bg-error', textColor: 'text-white' },
    { number: 35, color: 'bg-gray-800', textColor: 'text-white' },
    { number: 3, color: 'bg-error', textColor: 'text-white' },
    { number: 26, color: 'bg-gray-800', textColor: 'text-white' }
  ];

  useEffect(() => {
    if (result !== null && !isSpinning) {
      const segmentAngle = 360 / segments?.length;
      const resultIndex = segments?.findIndex(seg => seg?.number === result);
      const targetAngle = (resultIndex * segmentAngle) + (segmentAngle / 2);
      const finalRotation = rotation + (360 * 5) + (360 - targetAngle);
      setRotation(finalRotation);
    }
  }, [result, isSpinning]);

  const handleSpin = () => {
    if (!isSpinning && onSpin) {
      onSpin();
    }
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary drop-shadow-lg"></div>
        </div>

        {/* Wheel */}
        <div className="relative w-80 h-80 lg:w-96 lg:h-96">
          <div
            ref={wheelRef}
            className={`w-full h-full rounded-full border-4 border-primary shadow-gaming-lg transition-transform ease-out ${
              isSpinning ? 'animate-spin' : ''
            }`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: '3000ms',
              background: `conic-gradient(${segments?.map((segment, index) => {
                const startAngle = (index * 360) / segments?.length;
                const endAngle = ((index + 1) * 360) / segments?.length;
                const color = segment?.number === 0 ? '#00FF88' : segment?.color === 'bg-error' ? '#FF4757' : '#1A1A1D';
                return `${color} ${startAngle}deg ${endAngle}deg`;
              })?.join(', ')})`
            }}
          >
            {/* Numbers on wheel */}
            {segments?.map((segment, index) => {
              const angle = (index * 360) / segments?.length + (360 / segments?.length) / 2;
              const radius = 120;
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
              
              return (
                <div
                  key={segment?.number}
                  className="absolute text-white font-bold text-sm lg:text-base"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`
                  }}
                >
                  {segment?.number}
                </div>
              );
            })}

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-card border-4 border-primary rounded-full flex items-center justify-center shadow-gaming-md">
              <Icon name="Zap" size={24} className="text-primary" />
            </div>
          </div>
        </div>
      </div>
      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className={`mt-8 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
          isSpinning
            ? 'bg-muted text-text-secondary cursor-not-allowed' :'bg-primary text-primary-foreground hover:bg-primary/90 shadow-gaming-md hover:shadow-gaming-lg micro-interaction'
        }`}
      >
        {isSpinning ? (
          <div className="flex items-center space-x-2">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span>Spinning...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Icon name="RotateCcw" size={20} />
            <span>Spin Wheel</span>
          </div>
        )}
      </button>
      {/* Result Display */}
      {result !== null && !isSpinning && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-card border border-border rounded-lg shadow-gaming-md">
            <Icon name="Target" size={20} className="text-primary" />
            <span className="text-lg font-semibold text-foreground">
              Winning Number: <span className="text-primary font-mono">{result}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;