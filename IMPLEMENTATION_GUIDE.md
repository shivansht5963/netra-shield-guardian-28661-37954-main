# Phishing Detection Frontend Implementation Guide

## Scoring System

### Base Score: 180 points
Every URL starts with a perfect score of 180 and gets points deducted based on security issues.

### Point Deductions

#### Major Issues (-25 points each)
- ✖️ Found in UrlVoid blacklist
- ✖️ Failed Google Safe Browsing check
- ✖️ Failed Norton WebSafe check
- ✖️ Found in McAfee blacklist
- ✖️ Found in Sucuri blacklist
- ✖️ Found in IP blacklist
- ✖️ AI model flags as malicious

#### Minor Issues (-15 points each)
- ✖️ No SSL certificate
- ✖️ No HTTPS
- ✖️ Domain age < 3 months
- ✖️ Temporary domain

### Risk Levels

1. **Very Safe (160-180)**
   - Top sites with proper security
   - Example: google.com, microsoft.com
   - Max 1 minor issue allowed

2. **Generally Safe (140-159)**
   - Good sites with minor issues
   - Up to 2 minor issues
   - No major security flags

3. **Suspicious (100-139)**
   - Multiple minor issues OR
   - One major security flag
   - Needs user caution

4. **High Risk (Below 100)**
   - Multiple major issues OR
   - Any 3+ security flags
   - Not recommended to proceed

### Auto-High Risk Rules
- 3 or more security flags = High Risk
- Multiple blacklist presence = High Risk
- Failed major security checks = High Risk

## Frontend Components

### 1. URL Input Form
```typescript
interface URLFormProps {
  onSubmit: (url: string) => Promise<void>;
}

// Features:
- URL validation
- Loading state
- Error handling
- Clean URL formatting
```

### 2. Results Display
```typescript
interface DetectionResult {
  SCORE: number;
  isHTTPS: boolean;
  hasSSLCertificate: boolean;
  InMcaffeBlackList: boolean;
  InSucuriBlacklist: boolean;
  isOlderThan3Months: boolean;
  // ... other security checks
}

// Display Elements:
- Risk level alert
- Score progress bar
- Security details list
- Warning indicators
```

### 3. Risk Level Display
```typescript
type RiskLevel = {
  level: 'Very Safe' | 'Generally Safe' | 'Suspicious' | 'High Risk';
  color: 'success' | 'warning' | 'error';
}

// Color Coding:
- Very Safe: Green (success)
- Generally Safe: Green (success)
- Suspicious: Orange (warning)
- High Risk: Red (error)
```

## Implementation Steps

1. **URL Validation**
   ```typescript
   const validateUrl = (url: string): boolean => {
     try {
       new URL(url.startsWith('http') ? url : `https://${url}`);
       return true;
     } catch {
       return false;
     }
   };
   ```

2. **Score Calculation**
   ```typescript
   const calculateScore = (result: DetectionResult): number => {
     let score = 180;
     let flags = 0;

     // Major deductions (-25)
     if (result.InURLVoidBlackList) { score -= 25; flags++; }
     if (!result.GoogleSafePassed) { score -= 25; flags++; }
     if (result.InMcaffeBlackList) { score -= 25; flags++; }

     // Minor deductions (-15)
     if (!result.hasSSLCertificate) { score -= 15; flags++; }
     if (!result.isHTTPS) { score -= 15; flags++; }

     return flags >= 3 ? Math.min(score, 99) : Math.max(0, score);
   };
   ```

3. **Risk Level Determination**
   ```typescript
   const getRiskLevel = (score: number, flags: number): RiskLevel => {
     if (flags >= 3 || score < 100) return { level: 'High Risk', color: 'error' };
     if (score >= 160) return { level: 'Very Safe', color: 'success' };
     if (score >= 140) return { level: 'Generally Safe', color: 'success' };
     return { level: 'Suspicious', color: 'warning' };
   };
   ```

## Design Guidelines

### Colors
```typescript
const colors = {
  success: '#4CAF50',  // Green for safe
  warning: '#FF9800',  // Orange for suspicious
  error: '#F44336',    // Red for high risk
  neutral: '#9E9E9E'   // Gray for inactive
};
```

### UI Components
1. Glass Card Effect
   ```css
   background: rgba(255, 255, 255, 0.7);
   backdrop-filter: blur(20px);
   border: 1px solid rgba(255, 255, 255, 0.8);
   border-radius: 24px;
   ```

2. Progress Bar
   ```css
   height: 8px;
   border-radius: 4px;
   background: linear-gradient(...);
   ```

3. Alert Styles
   ```css
   border-radius: 12px;
   padding: 16px;
   margin: 8px 0;
   ```

## Error Handling

1. **URL Validation Errors**
   - Invalid URL format
   - Missing protocol
   - Empty input

2. **API Errors**
   - Network failures
   - Server errors
   - Timeout handling

3. **Display Errors**
   - Loading states
   - Error messages
   - Retry options

## Best Practices

1. **Performance**
   - Debounce URL checks
   - Cache recent results
   - Optimize re-renders

2. **User Experience**
   - Clear error messages
   - Loading indicators
   - Smooth animations

3. **Security**
   - Sanitize URL inputs
   - Validate API responses
   - Handle edge cases

## Usage Example

```typescript
// Component implementation
const PhishingDetector = () => {
  const handleCheck = async (url: string) => {
    try {
      const result = await checkUrl(url);
      const score = calculateScore(result);
      const riskLevel = getRiskLevel(score);
      // Update UI with results
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <Stack spacing={3}>
      <URLForm onSubmit={handleCheck} />
      {result && <DetectionResults result={result} />}
    </Stack>
  );
};
```