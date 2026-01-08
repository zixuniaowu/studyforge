/**
 * AttentionHeatmap
 * Interactive visualization of attention weights
 */

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { AttentionHead, TokenInfo } from '../types';
import { I18nStrings } from '../i18n';

interface AttentionHeatmapProps {
  attentionHead: AttentionHead | null;
  tokens: TokenInfo[];
  selectedLayer: number;
  selectedHead: number;
  onLayerChange: (layer: number) => void;
  onHeadChange: (head: number) => void;
  isActive: boolean;
  i18n: I18nStrings;
}

const NUM_LAYERS = 12;
const NUM_HEADS = 12;

export const AttentionHeatmap: React.FC<AttentionHeatmapProps> = ({
  attentionHead,
  tokens,
  selectedLayer,
  selectedHead,
  onLayerChange,
  onHeadChange,
  isActive,
  i18n,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  // Draw heatmap using D3
  useEffect(() => {
    if (!svgRef.current || !attentionHead || tokens.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 20, bottom: 60, left: 60 };
    const containerWidth = svgRef.current.clientWidth || 300;
    const containerHeight = svgRef.current.clientHeight || 300;
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const seqLen = tokens.length;
    const cellSize = Math.min(width / seqLen, height / seqLen, 40);
    const heatmapWidth = cellSize * seqLen;
    const heatmapHeight = cellSize * seqLen;

    // Create main group
    const g = svg
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left + (width - heatmapWidth) / 2}, ${margin.top})`
      );

    // Color scale
    const colorScale = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, 1]);

    // Draw cells
    const weights = attentionHead.weights;

    for (let i = 0; i < seqLen; i++) {
      for (let j = 0; j < seqLen; j++) {
        const weight = weights[i]?.[j] ?? 0;

        g.append('rect')
          .attr('x', j * cellSize)
          .attr('y', i * cellSize)
          .attr('width', cellSize - 1)
          .attr('height', cellSize - 1)
          .attr('fill', colorScale(weight))
          .attr('rx', 2)
          .attr('class', 'cursor-pointer')
          .on('mouseenter', function () {
            d3.select(this).attr('stroke', '#fff').attr('stroke-width', 2);
            setHoveredCell({ row: i, col: j });
          })
          .on('mouseleave', function () {
            d3.select(this).attr('stroke', 'none');
            setHoveredCell(null);
          });
      }
    }

    // X-axis labels (top)
    const formatToken = (text: string) => {
      const formatted = text.replace(/Ġ/g, '').trim() || '␣';
      return formatted.length > 4 ? formatted.slice(0, 4) + '…' : formatted;
    };

    g.selectAll('.x-label')
      .data(tokens)
      .enter()
      .append('text')
      .attr('class', 'x-label')
      .attr('x', (_, i) => i * cellSize + cellSize / 2)
      .attr('y', -8)
      .attr('text-anchor', 'middle')
      .attr('fill', '#9ca3af')
      .attr('font-size', Math.min(cellSize * 0.6, 12))
      .attr('font-family', 'monospace')
      .text((d) => formatToken(d.text));

    // Y-axis labels (left)
    g.selectAll('.y-label')
      .data(tokens)
      .enter()
      .append('text')
      .attr('class', 'y-label')
      .attr('x', -8)
      .attr('y', (_, i) => i * cellSize + cellSize / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#9ca3af')
      .attr('font-size', Math.min(cellSize * 0.6, 12))
      .attr('font-family', 'monospace')
      .text((d) => formatToken(d.text));

    // Axis titles
    svg
      .append('text')
      .attr('x', margin.left + width / 2)
      .attr('y', margin.top + heatmapHeight + 35)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6b7280')
      .attr('font-size', 11)
      .text('Key (attending to)');

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(margin.top + heatmapHeight / 2))
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6b7280')
      .attr('font-size', 11)
      .text('Query (from)');
  }, [attentionHead, tokens]);

  return (
    <div
      className={`
        bg-gray-800/50 rounded-xl border p-4 transition-all duration-300
        ${isActive ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' : 'border-gray-700/50'}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
            ${isActive ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'}
          `}
        >
          3
        </div>
        <div>
          <h3 className="text-white font-semibold">{i18n.stage3}</h3>
          <p className="text-gray-400 text-sm">{i18n.stage3Desc}</p>
        </div>
      </div>

      {/* Layer/Head Selectors */}
      <div className="flex gap-4 mb-4">
        {/* Layer Selector */}
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">{i18n.selectLayer}</label>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: NUM_LAYERS }, (_, i) => (
              <button
                key={`layer-${i}`}
                onClick={() => onLayerChange(i)}
                className={`
                  w-7 h-7 text-xs rounded transition-all
                  ${
                    selectedLayer === i
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }
                `}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Head Selector */}
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">{i18n.selectHead}</label>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: NUM_HEADS }, (_, i) => (
              <button
                key={`head-${i}`}
                onClick={() => onHeadChange(i)}
                className={`
                  w-7 h-7 text-xs rounded transition-all
                  ${
                    selectedHead === i
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }
                `}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Selection */}
      <div className="text-sm text-gray-400 mb-2">
        {i18n.layer} {selectedLayer} • {i18n.head} {selectedHead}
      </div>

      {/* Heatmap Container */}
      <div className="relative bg-gray-900/50 rounded-lg p-2" style={{ minHeight: 280 }}>
        {tokens.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-500 text-sm">
            Enter text to see attention pattern
          </div>
        ) : (
          <>
            <svg ref={svgRef} className="w-full h-64" />

            {/* Hover tooltip */}
            {hoveredCell && attentionHead && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-2 right-2 bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs"
              >
                <div className="text-gray-500">
                  "{tokens[hoveredCell.row]?.text}" → "{tokens[hoveredCell.col]?.text}"
                </div>
                <div className="text-white font-mono">
                  {(
                    (attentionHead.weights[hoveredCell.row]?.[hoveredCell.col] ?? 0) * 100
                  ).toFixed(2)}
                  %
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Color Legend */}
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <span>0%</span>
        <div className="flex-1 h-2 rounded bg-gradient-to-r from-gray-900 via-blue-700 to-blue-400" />
        <span>100%</span>
      </div>
    </div>
  );
};

export default AttentionHeatmap;
