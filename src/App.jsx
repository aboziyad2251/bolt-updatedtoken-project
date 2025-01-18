import React, { useState } from 'react'

    function App() {
      const [totalTokens, setTotalTokens] = useState(70000000)
      const [usedTokens, setUsedTokens] = useState(0)
      const remainingTokens = totalTokens - usedTokens
      const usagePercentage = ((usedTokens / totalTokens) * 100).toFixed(2)

      const handleTotalChange = (e) => {
        const value = e.target.value.replace(/,/g, '')
        const numericValue = Math.max(0, Number(value))
        setTotalTokens(numericValue)
        // Adjust used tokens if they exceed new total
        if (usedTokens > numericValue) {
          setUsedTokens(numericValue)
        }
      }

      const handleUsedChange = (e) => {
        const value = e.target.value.replace(/,/g, '')
        const numericValue = Math.min(totalTokens, Math.max(0, Number(value)))
        setUsedTokens(numericValue)
      }

      const handlePaste = (e, setter) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData('text')
        const cleanedValue = pasteData.replace(/[^0-9]/g, '')
        const numericValue = Math.max(0, Number(cleanedValue))
        setter(numericValue)
      }

      const formatInputValue = (value) => {
        return value.toLocaleString()
      }

      return (
        <div className="container">
          <h1>Token Usage Tracker</h1>
          <div className="token-display">
            <div className="token-item">
              <span className="token-label">Total Tokens</span>
              <input
                type="text"
                value={formatInputValue(totalTokens)}
                onChange={handleTotalChange}
                onPaste={(e) => handlePaste(e, setTotalTokens)}
                className="token-input"
                inputMode="numeric"
              />
            </div>
            <div className="token-item">
              <span className="token-label">Used Tokens</span>
              <input
                type="text"
                value={formatInputValue(usedTokens)}
                onChange={handleUsedChange}
                onPaste={(e) => handlePaste(e, setUsedTokens)}
                className="token-input"
                inputMode="numeric"
              />
            </div>
            <div className="token-item">
              <span className="token-label">Remaining Tokens</span>
              <span className="token-value remaining-tokens">
                {remainingTokens.toLocaleString()}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      )
    }

    export default App
