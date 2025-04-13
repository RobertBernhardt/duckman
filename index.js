// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-link');
const cursor = document.querySelector('.cursor');
const toyCards = document.querySelectorAll('.toy-card');
const demoContainer = document.querySelector('.demo-container');
const demos = document.querySelectorAll('.demo');
const closeDemoButtons = document.querySelectorAll('.close-demo');
const ideaInput = document.getElementById('idea-input');
const matchIdeaButton = document.getElementById('match-idea');
const ideaResult = document.getElementById('idea-result');
const forecastOptions = document.querySelectorAll('.forecast-option');
const forecastResult = document.getElementById('forecast-result');
const forecastChart = document.getElementById('forecast-chart');
const promptInput = document.getElementById('prompt-input');
const testPromptButton = document.getElementById('test-prompt');
const chatsecResult = document.getElementById('chatsec-result');

// On Load Animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
    
    // Start code animation
    startCodeAnimation();
});

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = '1';
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    const hoveredElement = e.target;
    
    if (
        hoveredElement.classList.contains('btn') || 
        hoveredElement.classList.contains('nav-link') ||
        hoveredElement.classList.contains('try-demo-btn') ||
        hoveredElement.tagName === 'BUTTON'
    ) {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    } else {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - header.offsetHeight,
            behavior: 'smooth'
        });
    });
});

// Code Animation
function startCodeAnimation() {
    const codeElement = document.querySelector('.code-animation');
    if (!codeElement) return;
    
    const codeText = codeElement.innerText;
    codeElement.innerText = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < codeText.length) {
            codeElement.innerText += codeText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            
            // Add blinking cursor at the end
            const cursor = document.createElement('span');
            cursor.classList.add('code-cursor');
            cursor.innerText = '|';
            codeElement.appendChild(cursor);
            
            // Blink the cursor
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }, 20);
}

// AI Toys Demos
toyCards.forEach(card => {
    card.addEventListener('click', () => {
        const toyType = card.getAttribute('data-toy');
        demoContainer.style.display = 'block';
        
        // Hide all demos first
        demos.forEach(demo => {
            demo.classList.remove('active');
        });
        
        // Show the selected demo
        const selectedDemo = document.getElementById(`${toyType}-demo`);
        selectedDemo.classList.add('active');
        
        // Scroll to the demo
        window.scrollTo({
            top: demoContainer.offsetTop - header.offsetHeight - 20,
            behavior: 'smooth'
        });
    });
});

// Close Demo Buttons
closeDemoButtons.forEach(button => {
    button.addEventListener('click', () => {
        demoContainer.style.display = 'none';
        demos.forEach(demo => {
            demo.classList.remove('active');
        });
    });
});

// IdeaMatcher Demo
matchIdeaButton.addEventListener('click', () => {
    const idea = ideaInput.value.trim();
    
    if (!idea) {
        alert('Please enter your business idea first.');
        return;
    }
    
    // Show loading state
    ideaResult.style.display = 'block';
    ideaResult.innerHTML = '<p>Analyzing your idea...</p>';
    
    // Simple keyword matching algorithm
    setTimeout(() => {
        let aiTool = '';
        let confidence = 0;
        let explanation = '';
        
        if (idea.toLowerCase().includes('communicat')) {
            aiTool = 'AI Communication Assistant';
            confidence = 87;
            explanation = 'You\'re describing an AI-powered communication platform that helps businesses streamline their internal and external messaging.';
        } else if (idea.toLowerCase().includes('data') || idea.toLowerCase().includes('analys')) {
            aiTool = 'Predictive Analytics Engine';
            confidence = 92;
            explanation = 'What you\'re looking for is a data analytics platform with AI-driven insights and visualization capabilities.';
        } else if (idea.toLowerCase().includes('customer') || idea.toLowerCase().includes('service')) {
            aiTool = 'Customer Service AI';
            confidence = 89;
            explanation = 'You\'re aiming to build an AI customer service solution that handles inquiries and provides personalized support.';
        } else if (idea.toLowerCase().includes('content') || idea.toLowerCase().includes('market')) {
            aiTool = 'Content Generation Assistant';
            confidence = 85;
            explanation = 'You want an AI tool that helps create, optimize, and distribute marketing content across channels.';
        } else {
            aiTool = 'Multi-purpose Business AI';
            confidence = 75;
            explanation = 'Your idea seems to involve an AI solution that addresses multiple business needs simultaneously.';
        }
        
        ideaResult.innerHTML = `
            <h4>Your AI Tool Match:</h4>
            <p><strong>${aiTool}</strong></p>
            <div class="confidence-meter">
                <div class="confidence-bar" style="width: ${confidence}%"></div>
                <span>${confidence}% match confidence</span>
            </div>
            <p>${explanation}</p>
            <p class="disclaimer">Note: This is a simplified demo. A real implementation would use NLP to analyze your idea in depth.</p>
        `;
        
        ideaResult.style.display = 'block';
    }, 1500);
});

// MiniForecaster Demo
forecastOptions.forEach(option => {
    option.addEventListener('click', () => {
        const trend = option.getAttribute('data-trend');
        
        // Show loading state
        forecastResult.style.display = 'block';
        forecastChart.innerHTML = '<p>Generating forecast...</p>';
        
        // Generate mock forecast data
        setTimeout(() => {
            const data = generateForecastData(trend);
            renderChart(data);
            forecastResult.style.display = 'block';
        }, 1000);
    });
});

function generateForecastData(trend) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let data = [];
    
    switch(trend) {
        case 'coffee':
            // Coffee shop visits trend (seasonal)
            data = months.map((month, index) => {
                const seasonal = Math.sin((index / 11) * Math.PI) * 25;
                const base = 100 + seasonal;
                const random = Math.random() * 10 - 5;
                return { month, actual: Math.round(base + random) };
            });
            
            // Forecast next 6 months
            for(let i = 0; i < 6; i++) {
                const index = i % 12;
                const seasonal = Math.sin(((index + 6) / 11) * Math.PI) * 25;
                const base = 105 + seasonal; // Slight upward trend
                const random = Math.random() * 8 - 4;
                const forecast = Math.round(base + random);
                
                data.push({ 
                    month: `${months[index]} (Forecast)`, 
                    forecast: forecast 
                });
            }
            break;
            
        case 'remote':
            // Remote work adoption (upward trend with plateau)
            data = months.map((month, index) => {
                const sigmoid = 100 / (1 + Math.exp(-0.5 * (index - 5)));
                const random = Math.random() * 5 - 2.5;
                return { month, actual: Math.round(sigmoid + random) };
            });
            
            // Forecast next 6 months (plateau with slight fluctuations)
            for(let i = 0; i < 6; i++) {
                const plateau = 95 + Math.random() * 10 - 5;
                data.push({ 
                    month: `${months[i % 12]} (Forecast)`, 
                    forecast: Math.round(plateau) 
                });
            }
            break;
            
        case 'ai':
            // AI tool usage (exponential growth)
            data = months.map((month, index) => {
                const exponential = 10 * Math.exp(0.2 * index);
                const random = Math.random() * (exponential * 0.1) - (exponential * 0.05);
                return { month, actual: Math.round(exponential + random) };
            });
            
            // Forecast next 6 months (continued exponential growth)
            for(let i = 0; i < 6; i++) {
                const index = i + 12;
                const exponential = 10 * Math.exp(0.2 * index);
                const random = Math.random() * (exponential * 0.15) - (exponential * 0.075);
                
                data.push({ 
                    month: `${months[i % 12]} (Forecast)`, 
                    forecast: Math.round(exponential + random) 
                });
            }
            break;
    }
    
    return data;
}

function renderChart(data) {
    const labels = data.map(item => item.month);
    const actualData = data.map(item => item.actual || null);
    const forecastData = data.map(item => item.forecast || null);
    
    // Create mock chart visualization with HTML/CSS
    let chartHTML = `
        <div class="chart-container">
            <div class="chart-y-axis">
                <div class="chart-y-label">Value</div>
                <div class="chart-y-ticks">
                    ${[100, 75, 50, 25, 0].map(tick => `<div class="chart-y-tick">${tick}</div>`).join('')}
                </div>
            </div>
            <div class="chart-main">
                <div class="chart-bars">
    `;
    
    // Add bars for actual data
    for (let i = 0; i < actualData.length; i++) {
        if (actualData[i] !== null) {
            const height = actualData[i];
            chartHTML += `
                <div class="chart-bar actual" style="height: ${height}%">
                    <div class="chart-tooltip">${actualData[i]}</div>
                </div>
            `;
        } else {
            chartHTML += `<div class="chart-bar-spacer"></div>`;
        }
    }
    
    // Add bars for forecast data
    for (let i = 0; i < forecastData.length; i++) {
        if (forecastData[i] !== null) {
            const height = forecastData[i];
            chartHTML += `
                <div class="chart-bar forecast" style="height: ${height}%">
                    <div class="chart-tooltip">${forecastData[i]}</div>
                </div>
            `;
        }
    }
    
    chartHTML += `
                </div>
                <div class="chart-x-axis">
    `;
    
    // Add x-axis labels
    for (let i = 0; i < labels.length; i++) {
        chartHTML += `<div class="chart-x-label">${labels[i].split(' ')[0]}</div>`;
    }
    
    chartHTML += `
                </div>
            </div>
        </div>
        <div class="chart-legend">
            <div class="legend-item">
                <div class="legend-color actual"></div>
                <div>Actual Data</div>
            </div>
            <div class="legend-item">
                <div class="legend-color forecast"></div>
                <div>AI Forecast</div>
            </div>
        </div>
        <p class="chart-note">Forecast uses a proprietary algorithm combining time-series analysis and machine learning.</p>
    `;
    
    // Apply the chart HTML
    forecastChart.innerHTML = chartHTML;
    
    // Add some CSS for the chart
    const style = document.createElement('style');
    style.textContent = `
        .chart-container {
            display: flex;
            height: 250px;
            margin-top: 20px;
        }
        .chart-y-axis {
            width: 40px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding-right: 10px;
        }
        .chart-y-label {
            font-weight: bold;
            margin-bottom: 10px;
            transform: rotate(-90deg);
            position: relative;
            top: 50px;
            right: -15px;
        }
        .chart-y-ticks {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }
        .chart-y-tick {
            font-size: 12px;
            color: #666;
        }
        .chart-main {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .chart-bars {
            flex: 1;
            display: flex;
            align-items: flex-end;
            gap: 5px;
            border-bottom: 1px solid #ccc;
            border-left: 1px solid #ccc;
            padding-bottom: 5px;
            position: relative;
        }
        .chart-bar, .chart-bar-spacer {
            flex: 1;
            min-width: 20px;
            max-width: 40px;
            position: relative;
            transition: height 1s ease-out;
        }
        .chart-bar {
            border-radius: 4px 4px 0 0;
        }
        .chart-bar.actual {
            background-color: #00c2ff;
        }
        .chart-bar.forecast {
            background-color: #ff6b00;
            position: relative;
        }
        .chart-tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0,0,0,0.7);
            color: white;
            padding: 3px 6px;
            border-radius: 4px;
            font-size: 10px;
            opacity: 0;
            transition: opacity 0.3s;
            white-space: nowrap;
        }
        .chart-bar:hover .chart-tooltip {
            opacity: 1;
        }
        .chart-x-axis {
            display: flex;
            padding-top: 5px;
        }
        .chart-x-label {
            flex: 1;
            text-align: center;
            font-size: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            transform: rotate(-45deg);
            transform-origin: top left;
            position: relative;
            left: 10px;
            white-space: nowrap;
        }
        .chart-legend {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        .legend-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 14px;
        }
        .legend-color {
            width: 15px;
            height: 15px;
            border-radius: 3px;
        }
        .legend-color.actual {
            background-color: #00c2ff;
        }
        .legend-color.forecast {
            background-color: #ff6b00;
        }
        .chart-note {
            font-size: 12px;
            color: #666;
            text-align: center;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(style);
    
    // Animate bars
    setTimeout(() => {
        const bars = document.querySelectorAll('.chart-bar');
        bars.forEach((bar, index) => {
            const originalHeight = bar.style.height;
            bar.style.height = '0%';
            setTimeout(() => {
                bar.style.height = originalHeight;
            }, index * 50);
        });
    }, 100);
}

// ChatSec Demo
testPromptButton.addEventListener('click', () => {
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
        alert('Please enter a prompt first.');
        return;
    }
    
    // Show loading state
    chatsecResult.style.display = 'block';
    chatsecResult.innerHTML = '<p>Testing prompt...</p>';
    
    // Simple analysis of the prompt
    setTimeout(() => {
        let result = '';
        let riskLevel = '';
        let riskColor = '';
        
        if (prompt.toLowerCase().includes('ignore') && prompt.toLowerCase().includes('instruction')) {
            riskLevel = 'High Risk';
            riskColor = '#ff3b30';
            result = `
                <p><strong>Potential Jailbreak Attempt Detected</strong></p>
                <p>This prompt is attempting to bypass the AI's safety guidelines by asking it to ignore instructions.</p>
                <p>Specific issues:</p>
                <ul>
                    <li>Contains explicit instruction override attempt</li>
                    <li>Uses manipulation techniques to bypass safety</li>
                </ul>
                <p>Recommendation: This prompt would be blocked in a production system.</p>
            `;
        } else if (prompt.toLowerCase().includes('system') && prompt.toLowerCase().includes('prompt')) {
            riskLevel = 'Medium Risk';
            riskColor = '#ff9500';
            result = `
                <p><strong>Extraction Attempt Detected</strong></p>
                <p>This prompt is attempting to extract information about the AI's system prompt or configuration.</p>
                <p>Specific issues:</p>
                <ul>
                    <li>Attempts to extract confidential system information</li>
                    <li>Could be used to plan more sophisticated attacks</li>
                </ul>
                <p>Recommendation: Implement information disclosure countermeasures.</p>
            `;
        } else if (prompt.toLowerCase().includes('password') || prompt.toLowerCase().includes('credit card')) {
            riskLevel = 'Medium Risk';
            riskColor = '#ff9500';
            result = `
                <p><strong>Sensitive Information Request</strong></p>
                <p>This prompt is requesting sensitive information that should not be shared.</p>
                <p>Specific issues:</p>
                <ul>
                    <li>Requests potentially confidential data</li>
                    <li>Could be used in social engineering attacks</li>
                </ul>
                <p>Recommendation: Implement PII detection and filtering.</p>
            `;
        } else {
            riskLevel = 'Low Risk';
            riskColor = '#34c759';
            result = `
                <p><strong>No Obvious Security Threats Detected</strong></p>
                <p>This prompt appears to be relatively safe, though advanced semantic attacks might not be detected by this simplified demo.</p>
                <p>In a real system, we would perform:</p>
                <ul>
                    <li>Deep semantic analysis</li>
                    <li>Context-aware policy enforcement</li>
                    <li>Comparison against known attack patterns</li>
                </ul>
                <p>Recommendation: Safe to process with standard guardrails.</p>
            `;
        }
        
        chatsecResult.innerHTML = `
            <div class="risk-meter">
                <div class="risk-indicator" style="background-color: ${riskColor}">
                    ${riskLevel}
                </div>
            </div>
            ${result}
            <p class="disclaimer">Note: This is a simplified demo using basic pattern matching. A real implementation would use more sophisticated analysis techniques.</p>
        `;
        
        // Add style for risk meter
        const style = document.createElement('style');
        style.textContent = `
            .risk-meter {
                margin-bottom: 15px;
                text-align: center;
            }
            .risk-indicator {
                display: inline-block;
                padding: 8px 20px;
                border-radius: 20px;
                color: white;
                font-weight: bold;
            }
            .disclaimer {
                font-size: 12px;
                color: #666;
                margin-top: 20px;
                font-style: italic;
            }
        `;
        document.head.appendChild(style);
    }, 1500);
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animated classes to the stylesheet
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .code-cursor {
        display: inline-block;
        animation: blink 0.7s infinite;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    
    .confidence-meter {
        background-color: #eee;
        height: 20px;
        border-radius: 10px;
        margin: 15px 0;
        position: relative;
        overflow: hidden;
    }
    
    .confidence-bar {
        height: 100%;
        background-color: var(--primary);
        border-radius: 10px;
        transition: width 1s ease-out;
    }
    
    .confidence-meter span {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: #333;
        font-weight: bold;
    }
`;

document.head.appendChild(animationStyle);

// Easter egg - Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.classList.add('konami-mode');
            
            // Create floating ducks
            for (let i = 0; i < 20; i++) {
                createFloatingDuck();
            }
            
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function createFloatingDuck() {
    const duck = document.createElement('div');
    duck.classList.add('floating-duck');
    
    // Random position and size
    const size = Math.random() * 50 + 30;
    const left = Math.random() * window.innerWidth;
    const top = Math.random() * window.innerHeight;
    
    duck.style.width = `${size}px`;
    duck.style.height = `${size}px`;
    duck.style.left = `${left}px`;
    duck.style.top = `${top}px`;
    
    // Random movement
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    duck.style.animation = `float-duck ${duration}s ease-in-out ${delay}s infinite`;
    
    document.body.appendChild(duck);
    
    // Remove after a while
    setTimeout(() => {
        duck.remove();
    }, 15000);
    
    // Add duck styling
    const duckStyle = document.createElement('style');
    duckStyle.textContent = `
        .floating-duck {
            position: fixed;
            background-image: url('images/logo.png');
            background-size: contain;
            background-repeat: no-repeat;
            z-index: 9999;
            pointer-events: none;
        }
        
        @keyframes float-duck {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(100px, -100px) rotate(10deg);
            }
            50% {
                transform: translate(200px, 0) rotate(0deg);
            }
            75% {
                transform: translate(100px, 100px) rotate(-10deg);
            }
        }
        
        .konami-mode {
            animation: rainbow-bg 10s linear infinite;
        }
        
        @keyframes rainbow-bg {
            0% { background-color: #ff9aa2; }
            14% { background-color: #ffb7b2; }
            28% { background-color: #ffdac1; }
            42% { background-color: #e2f0cb; }
            57% { background-color: #b5ead7; }
            71% { background-color: #c7ceea; }
            85% { background-color: #f8b7cd; }
            100% { background-color: #ff9aa2; }
        }
    `;
    
    document.head.appendChild(duckStyle);
}