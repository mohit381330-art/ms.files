// ===== AI CODE DEBUGGER - MAIN SCRIPT =====

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initHeroAnimation();
    initEditor();
    initDebugger();
    initAbout();
    initScrollAnimations();
    animateCounters();
});

// ===== PARTICLE BACKGROUND =====
function initParticles() {
    const container = document.getElementById('bgParticles');
    const count = 40;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.width = particle.style.height = (2 + Math.random() * 3) + 'px';
        const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#3b82f6', '#10b981'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(particle);
    }
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id], .hero[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        links.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === current) {
                link.classList.add('active');
            }
        });
    });

    // Close mobile nav on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ===== HERO CODE ANIMATION =====
function initHeroAnimation() {
    const codeEl = document.getElementById('heroCode');
    const codeLines = [
        '<span class="keyword">def</span> <span class="function">calculate_average</span>(numbers):',
        '    <span class="comment"># Find the average of a list</span>',
        '    total = <span class="number">0</span>',
        '<span class="error-line">    <span class="keyword">for</span> i <span class="keyword">in</span> range(len(numbers))   <span style="color:#ef4444">← Missing colon</span></span>',
        '        total += numbers[i]',
        '<span class="error-line">    average = total / <span class="number">0</span>    <span style="color:#ef4444">← Division by zero!</span></span>',
        '    <span class="keyword">return</span> average',
        '',
        '<span class="keyword">print</span>(<span class="function">calculate_average</span>([<span class="number">10</span>, <span class="number">20</span>, <span class="number">30</span>]))',
    ];

    let lineIndex = 0;
    function typeLine() {
        if (lineIndex < codeLines.length) {
            codeEl.innerHTML += codeLines[lineIndex] + '\n';
            lineIndex++;
            setTimeout(typeLine, 150 + Math.random() * 100);
        }
    }
    setTimeout(typeLine, 800);
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const step = target / 60;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current);
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ===== EDITOR =====
function initEditor() {
    const editor = document.getElementById('codeEditor');
    const lineNumbers = document.getElementById('lineNumbers');
    const lineCount = document.getElementById('lineCount');
    const charCount = document.getElementById('charCount');

    function updateLineNumbers() {
        const lines = editor.value.split('\n').length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
        lineCount.textContent = `Lines: ${lines}`;
        charCount.textContent = `Chars: ${editor.value.length}`;
    }

    editor.addEventListener('input', updateLineNumbers);
    editor.addEventListener('scroll', () => {
        lineNumbers.scrollTop = editor.scrollTop;
    });

    // Tab support
    editor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = editor.selectionStart;
            const end = editor.selectionEnd;
            editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
            editor.selectionStart = editor.selectionEnd = start + 4;
            updateLineNumbers();
        }
    });

    updateLineNumbers();

    // Clear button
    document.getElementById('clearBtn').addEventListener('click', () => {
        editor.value = '';
        updateLineNumbers();
        resetResults();
        showToast('Code cleared');
    });

    // Copy button
    document.getElementById('copyBtn').addEventListener('click', () => {
        if (editor.value) {
            navigator.clipboard.writeText(editor.value);
            showToast('Code copied to clipboard!');
        }
    });

    // Sample code button
    document.getElementById('sampleBtn').addEventListener('click', () => {
        const lang = document.getElementById('languageSelect').value;
        editor.value = getSampleCode(lang);
        updateLineNumbers();
        showToast('Sample code loaded');
    });
}

// ===== DEBUGGER ENGINE =====
function initDebugger() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const tabBtns = document.querySelectorAll('.tab-btn');

    analyzeBtn.addEventListener('click', () => {
        const code = document.getElementById('codeEditor').value.trim();
        if (!code) {
            showToast('Please enter some code first!');
            return;
        }
        runAnalysis(code);
    });

    // Tab filtering
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterResults(btn.dataset.tab);
        });
    });
}

// ===== AUTO LANGUAGE DETECTION =====
function detectLanguage(code) {
    const scores = {};
    const langs = ['javascript', 'python', 'java', 'cpp', 'c', 'csharp', 'html', 'css', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'typescript'];
    langs.forEach(l => scores[l] = 0);

    // Python signals
    if (/^\s*def\s+\w+\s*\(/m.test(code)) scores.python += 10;
    if (/^\s*import\s+\w+/m.test(code)) scores.python += 5;
    if (/^\s*from\s+\w+\s+import/m.test(code)) scores.python += 8;
    if (/^\s*class\s+\w+.*:/m.test(code)) scores.python += 8;
    if (/print\s*\(/.test(code)) scores.python += 3;
    if (/^\s*elif\b/m.test(code)) scores.python += 10;
    if (/:\s*$/m.test(code)) scores.python += 3;
    if (/^\s*#[^!].*$/m.test(code)) scores.python += 2;
    if (/self\./m.test(code)) scores.python += 6;
    if (/^\s*print\s+[^(]/m.test(code)) scores.python += 8;

    // JavaScript signals
    if (/\bconst\s+\w+\s*=/.test(code)) scores.javascript += 6;
    if (/\blet\s+\w+\s*=/.test(code)) scores.javascript += 6;
    if (/\bvar\s+\w+\s*=/.test(code)) scores.javascript += 5;
    if (/\bfunction\s+\w+\s*\(/.test(code)) scores.javascript += 5;
    if (/=>/.test(code)) scores.javascript += 4;
    if (/console\.(log|warn|error)/.test(code)) scores.javascript += 8;
    if (/document\./.test(code)) scores.javascript += 7;
    if (/require\(/.test(code)) scores.javascript += 6;
    if (/\bmodule\.exports/.test(code)) scores.javascript += 8;

    // TypeScript signals
    if (/:\s*(string|number|boolean|any)\b/.test(code)) scores.typescript += 8;
    if (/interface\s+\w+/.test(code)) scores.typescript += 8;
    if (/\bas\s+\w+/.test(code)) scores.typescript += 4;

    // Java signals
    if (/public\s+(static\s+)?void\s+/.test(code)) scores.java += 10;
    if (/public\s+class\s+\w+/.test(code)) scores.java += 10;
    if (/System\.out\.print/.test(code)) scores.java += 10;
    if (/String\[\]\s+args/.test(code)) scores.java += 10;
    if (/private\s+(static\s+)?\w+/.test(code)) scores.java += 5;
    if (/@Override/.test(code)) scores.java += 8;

    // C++ signals
    if (/#include\s*<\w+>/.test(code)) scores.cpp += 8;
    if (/using\s+namespace\s+std/.test(code)) scores.cpp += 10;
    if (/std::/.test(code)) scores.cpp += 8;
    if (/cout\s*<</.test(code)) scores.cpp += 10;
    if (/cin\s*>>/.test(code)) scores.cpp += 10;
    if (/endl/.test(code)) scores.cpp += 5;

    // C signals
    if (/#include\s*<stdio\.h>/.test(code)) scores.c += 10;
    if (/#include\s*<stdlib\.h>/.test(code)) scores.c += 8;
    if (/printf\s*\(/.test(code)) scores.c += 7;
    if (/scanf\s*\(/.test(code)) scores.c += 8;
    if (/malloc\s*\(/.test(code)) scores.c += 6;

    // C# signals
    if (/using\s+System/.test(code)) scores.csharp += 10;
    if (/Console\.(Write|ReadLine)/.test(code)) scores.csharp += 10;
    if (/\bnamespace\s+\w+/.test(code)) scores.csharp += 6;

    // HTML signals
    if (/<html/i.test(code)) scores.html += 10;
    if (/<\/?(div|span|body|head|p|h[1-6]|a|img|form|input|button|table|ul|li)\b/i.test(code)) scores.html += 8;
    if (/<!DOCTYPE/i.test(code)) scores.html += 10;

    // CSS signals
    if (/[.#]\w+\s*\{[^}]*\}/s.test(code)) scores.css += 5;
    if (/\b(margin|padding|font-size|background|display|color|border)\s*:/.test(code)) scores.css += 8;
    if (/@media\s/.test(code)) scores.css += 10;

    // PHP signals
    if (/^<\?php/m.test(code)) scores.php += 15;
    if (/\$\w+\s*=/.test(code)) scores.php += 5;
    if (/\$_(GET|POST|REQUEST|SESSION)/.test(code)) scores.php += 10;
    if (/->\w+\(/.test(code) && /\$/.test(code)) scores.php += 5;

    // Ruby signals
    if (/\bputs\s+/.test(code)) scores.ruby += 6;
    if (/\bend\b/.test(code) && /\bdef\s+\w+/.test(code)) scores.ruby += 8;
    if (/\.each\s+do/.test(code)) scores.ruby += 8;

    // Go signals
    if (/^package\s+\w+/m.test(code)) scores.go += 10;
    if (/func\s+\w+\s*\(/.test(code)) scores.go += 7;
    if (/fmt\.(Print|Println|Sprintf)/.test(code)) scores.go += 10;
    if (/:=/.test(code)) scores.go += 5;

    // Rust signals
    if (/^\s*fn\s+\w+/m.test(code)) scores.rust += 7;
    if (/let\s+mut\s+/.test(code)) scores.rust += 10;
    if (/println!\s*\(/.test(code)) scores.rust += 10;
    if (/->\s*(i32|u32|String|bool|f64)/.test(code)) scores.rust += 8;

    // Swift signals
    if (/\bvar\s+\w+\s*:\s*(Int|String|Bool|Double)/.test(code)) scores.swift += 10;
    if (/\bguard\s+let\b/.test(code)) scores.swift += 10;
    if (/import\s+Foundation/.test(code)) scores.swift += 10;

    // Kotlin signals
    if (/\bfun\s+\w+\s*\(/.test(code)) scores.kotlin += 7;
    if (/\bval\s+\w+/.test(code) && /\bvar\s+\w+/.test(code)) scores.kotlin += 5;
    if (/println\(/.test(code) && /\bfun\b/.test(code)) scores.kotlin += 6;

    // Find the highest scoring language
    let best = 'javascript';
    let bestScore = 0;
    for (const [lang, score] of Object.entries(scores)) {
        if (score > bestScore) {
            bestScore = score;
            best = lang;
        }
    }
    return bestScore > 3 ? best : null; // null = keep user selection
}

function runAnalysis(code) {
    const langSelect = document.getElementById('languageSelect');
    let lang = langSelect.value;

    // Auto-detect language from code
    const detected = detectLanguage(code);
    if (detected) {
        lang = detected;
        langSelect.value = detected;
    }

    const resultsList = document.getElementById('resultsList');
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');
    const resultsSummary = document.getElementById('resultsSummary');

    // Show loading
    resultsList.style.display = 'none';
    if (emptyState) emptyState.style.display = 'none';
    loadingState.style.display = 'flex';
    resultsSummary.style.display = 'none';

    // Simulate AI analysis delay
    setTimeout(() => {
        const issues = analyzeCode(code, lang);
        displayResults(issues);
        loadingState.style.display = 'none';
        resultsList.style.display = 'block';
        resultsSummary.style.display = 'flex';
    }, 1200 + Math.random() * 800);
}

function analyzeCode(code, lang) {
    const issues = [];
    const lines = code.split('\n');

    // ===== UNIVERSAL CHECKS =====

    // Check for empty code
    if (code.trim().length === 0) {
        issues.push({ type: 'info', line: 1, message: 'Empty code block detected.', suggestion: 'Add your code to begin analysis.' });
        return issues;
    }

    // Very long lines
    lines.forEach((line, i) => {
        if (line.length > 120) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: `Line exceeds 120 characters (${line.length} chars).`,
                suggestion: 'Consider breaking long lines for better readability.',
            });
        }
    });

    // Trailing whitespace (limit to 3 max)
    let trailingCount = 0;
    lines.forEach((line, i) => {
        if (line !== line.trimEnd() && line.trim().length > 0 && trailingCount < 3) {
            trailingCount++;
            issues.push({
                type: 'info',
                line: i + 1,
                message: 'Trailing whitespace detected.',
                suggestion: 'Remove trailing whitespace for cleaner code.',
            });
        }
    });

    // TODO/FIXME/HACK comments
    lines.forEach((line, i) => {
        const match = line.match(/\b(TODO|FIXME|HACK|XXX|BUG)\b/i);
        if (match) {
            issues.push({
                type: 'info',
                line: i + 1,
                message: `${match[1].toUpperCase()} comment found: "${line.trim()}"`,
                suggestion: 'Review and address this comment before deployment.',
            });
        }
    });

    // Console/print debug statements — fixed condition with proper grouping
    lines.forEach((line, i) => {
        if (/console\.(log|warn|error|debug)\s*\(/.test(line) && (lang === 'javascript' || lang === 'typescript')) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: 'Console statement found — likely debug code.',
                suggestion: 'Remove or replace console statements before production.',
                fix: line.trim().replace(/console\.\w+\(/, '// console.log(')
            });
        }
    });

    // ===== EXTRA UNIVERSAL CHECKS =====

    // Division by zero (universal)
    lines.forEach((line, i) => {
        if (/\/\s*0([^.0-9]|$)/.test(line) && !isComment(line, lang === 'python' ? 'py' : 'js')) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'Potential division by zero detected.',
                suggestion: 'Add a check to ensure the divisor is not zero before dividing.',
            });
        }
    });

    // Empty catch/except blocks
    for (let i = 0; i < lines.length - 1; i++) {
        const trimmed = lines[i].trim();
        const nextTrimmed = (lines[i + 1] || '').trim();
        if (/^(catch|except)/.test(trimmed) && (nextTrimmed === '' || nextTrimmed === 'pass' || nextTrimmed === '}')) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: 'Empty error handler — errors will be silently swallowed.',
                suggestion: 'Log the error or handle it properly instead of ignoring it.',
            });
        }
    }

    // Hardcoded credentials/secrets
    lines.forEach((line, i) => {
        if (/\b(password|passwd|pwd|secret|api_key|apikey|token|auth)\s*=\s*['"][^'"]+['"]/i.test(line) && !isComment(line, lang === 'python' ? 'py' : 'js')) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'Hardcoded credential or secret detected — security risk!',
                suggestion: 'Use environment variables or a config file for sensitive data.',
            });
        }
    });

    // Magic numbers (repeated numbers > 1 that aren't 0, 1, 2)
    const numberOccurrences = {};
    lines.forEach((line, i) => {
        const nums = line.match(/\b(\d{3,})\b/g);
        if (nums) {
            nums.forEach(n => {
                if (!numberOccurrences[n]) numberOccurrences[n] = [];
                numberOccurrences[n].push(i + 1);
            });
        }
    });
    for (const [num, linesArr] of Object.entries(numberOccurrences)) {
        if (linesArr.length >= 2) {
            issues.push({
                type: 'info',
                line: linesArr[0],
                message: `Magic number \`${num}\` used ${linesArr.length} times (lines: ${linesArr.join(', ')}).`,
                suggestion: 'Define as a named constant for clarity and maintainability.',
            });
        }
    }

    // Deeply nested code (more than 4 levels)
    lines.forEach((line, i) => {
        const indent = line.match(/^(\s*)/)[1].length;
        const level = Math.floor(indent / (code.includes('\t') ? 1 : 4));
        if (level >= 5 && line.trim().length > 0) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: `Deeply nested code (${level} levels) — hard to read and maintain.`,
                suggestion: 'Refactor using early returns, helper functions, or guard clauses.',
            });
        }
    });

    // Duplicate lines detection
    const lineMap = {};
    lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (trimmed.length > 20 && !trimmed.startsWith('//') && !trimmed.startsWith('#') && !trimmed.startsWith('*') && !trimmed.startsWith('import') && !trimmed.startsWith('})') && trimmed !== '{' && trimmed !== '}') {
            if (!lineMap[trimmed]) lineMap[trimmed] = [];
            lineMap[trimmed].push(i + 1);
        }
    });
    for (const [line, linesArr] of Object.entries(lineMap)) {
        if (linesArr.length >= 3) {
            issues.push({
                type: 'warning',
                line: linesArr[0],
                message: `Duplicate code found ${linesArr.length} times: "${line.substring(0, 50)}..."`,
                suggestion: 'Extract into a reusable function to avoid code duplication (DRY principle).',
            });
        }
    }

    // Infinite loop detection
    lines.forEach((line, i) => {
        if (/^\s*while\s*\(\s*true\s*\)/.test(line) || /^\s*while\s+True\s*:/.test(line) || /^\s*for\s*\(\s*;\s*;\s*\)/.test(line)) {
            // Check if there's a break within next 10 lines
            const nextLines = lines.slice(i + 1, i + 11).join('\n');
            if (!/\bbreak\b/.test(nextLines)) {
                issues.push({
                    type: 'error',
                    line: i + 1,
                    message: 'Potential infinite loop — no `break` statement found nearby.',
                    suggestion: 'Add a break condition to prevent the program from hanging.',
                });
            }
        }
    });

    // Unmatched quotes (universal)
    lines.forEach((line, i) => {
        if (isComment(line, lang === 'python' ? 'py' : 'js')) return;
        // Count unescaped quotes
        const cleaned = line.replace(/\\['"]|\\\\./g, '');
        const singles = (cleaned.match(/'/g) || []).length;
        const doubles = (cleaned.match(/"/g) || []).length;
        if (singles % 2 !== 0 && !cleaned.includes('"')) {
            issues.push({ type: 'error', line: i + 1, message: 'Unmatched single quote detected.', suggestion: 'Check for missing closing single quote.' });
        }
        if (doubles % 2 !== 0 && !cleaned.includes("'")) {
            issues.push({ type: 'error', line: i + 1, message: 'Unmatched double quote detected.', suggestion: 'Check for missing closing double quote.' });
        }
    });

    // ===== LANGUAGE-SPECIFIC CHECKS =====
    switch (lang) {
        case 'javascript':
        case 'typescript':
            analyzeJavaScript(code, lines, issues, lang);
            break;
        case 'python':
            analyzePython(code, lines, issues);
            break;
        case 'java':
            analyzeJava(code, lines, issues);
            break;
        case 'cpp':
        case 'c':
            analyzeCpp(code, lines, issues, lang);
            break;
        case 'html':
            analyzeHTML(code, lines, issues);
            break;
        case 'css':
            analyzeCSS(code, lines, issues);
            break;
        case 'php':
            analyzePHP(code, lines, issues);
            break;
        case 'csharp':
            analyzeCSharp(code, lines, issues);
            break;
        case 'go':
            analyzeGo(code, lines, issues);
            break;
        case 'ruby':
            analyzeRuby(code, lines, issues);
            break;
        case 'rust':
            analyzeRust(code, lines, issues);
            break;
        default:
            analyzeGeneric(code, lines, issues);
    }

    // Remove duplicate issues (same line + same message)
    const seen = new Set();
    const unique = issues.filter(issue => {
        const key = `${issue.line}:${issue.message}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    // If no issues found
    if (unique.length === 0) {
        unique.push({
            type: 'info',
            line: '-',
            message: 'No issues detected! Your code looks clean. ✨',
            suggestion: 'Great job! Consider adding more test cases for edge scenarios.',
        });
    }

    return unique;
}

// ===== JAVASCRIPT/TYPESCRIPT ANALYSIS =====
function analyzeJavaScript(code, lines, issues, lang) {
    // var usage
    lines.forEach((line, i) => {
        if (/\bvar\s+\w/.test(line) && !isComment(line, 'js')) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: '`var` keyword used — may cause scoping issues.',
                suggestion: 'Use `let` or `const` for block-scoped variables.',
                fix: line.trim().replace(/\bvar\b/, 'const')
            });
        }
    });

    // == instead of ===
    lines.forEach((line, i) => {
        if (/[^=!<>]==[^=]/.test(line) && !isComment(line, 'js')) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: 'Loose equality `==` used instead of strict equality `===`.',
                suggestion: 'Use `===` for type-safe comparison to avoid unexpected coercion.',
                fix: line.trim().replace(/==/g, '===')
            });
        }
    });

    // Missing semicolons (basic check)
    lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (trimmed.length > 0 &&
            !trimmed.endsWith(';') &&
            !trimmed.endsWith('{') &&
            !trimmed.endsWith('}') &&
            !trimmed.endsWith(',') &&
            !trimmed.endsWith('(') &&
            !trimmed.endsWith(':') &&
            !trimmed.startsWith('//') &&
            !trimmed.startsWith('/*') &&
            !trimmed.startsWith('*') &&
            !trimmed.startsWith('import') &&
            !trimmed.startsWith('export') &&
            !trimmed.startsWith('if') &&
            !trimmed.startsWith('else') &&
            !trimmed.startsWith('for') &&
            !trimmed.startsWith('while') &&
            !trimmed.startsWith('function') &&
            !trimmed.startsWith('class') &&
            !trimmed.startsWith('switch') &&
            !trimmed.startsWith('case') &&
            !trimmed.startsWith('default') &&
            !trimmed.startsWith('return') &&
            /[a-zA-Z0-9)'"` ]$/.test(trimmed)) {
            issues.push({
                type: 'info',
                line: i + 1,
                message: 'Possible missing semicolon.',
                suggestion: 'Add a semicolon at the end of the statement if intended.',
            });
        }
    });

    // Unmatched brackets
    checkBrackets(code, lines, issues, ['{', '}'], ['[', ']'], ['(', ')']);

    // eval() usage
    lines.forEach((line, i) => {
        if (/\beval\s*\(/.test(line) && !isComment(line, 'js')) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: '`eval()` usage detected — severe security risk!',
                suggestion: 'Avoid eval(). Use JSON.parse(), Function constructor, or refactor logic.',
            });
        }
    });

    // alert() usage
    lines.forEach((line, i) => {
        if (/\balert\s*\(/.test(line) && !isComment(line, 'js')) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: '`alert()` found — poor UX practice.',
                suggestion: 'Use custom modal dialogs or toast notifications instead.',
            });
        }
    });

    // innerHTML usage
    lines.forEach((line, i) => {
        if (/\.innerHTML\s*=/.test(line) && !isComment(line, 'js')) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: 'Direct `innerHTML` assignment — potential XSS vulnerability.',
                suggestion: 'Use `textContent` or sanitize input before using innerHTML.',
            });
        }
    });

    // Unreachable code after return
    for (let i = 0; i < lines.length - 1; i++) {
        if (/^\s*return\b/.test(lines[i]) && lines[i + 1].trim().length > 0 && !lines[i + 1].trim().startsWith('}')) {
            issues.push({
                type: 'error',
                line: i + 2,
                message: 'Unreachable code detected after `return` statement.',
                suggestion: 'Remove or move this code before the return statement.',
            });
        }
    }

    // Async/await without try-catch
    if (/\basync\b/.test(code) && /\bawait\b/.test(code) && !/try\s*{/.test(code)) {
        issues.push({
            type: 'warning',
            line: '-',
            message: 'Async/await used without try-catch error handling.',
            suggestion: 'Wrap await calls in try-catch blocks to handle promise rejections.',
        });
    }

    // Duplicate function declarations
    const funcNames = [];
    lines.forEach((line, i) => {
        const match = line.match(/function\s+(\w+)/);
        if (match && !isComment(line, 'js')) {
            if (funcNames.includes(match[1])) {
                issues.push({
                    type: 'error',
                    line: i + 1,
                    message: `Duplicate function declaration: \`${match[1]}\``,
                    suggestion: 'Remove the duplicate or rename one of the functions.',
                });
            }
            funcNames.push(match[1]);
        }
    });

    // TypeScript specific
    if (lang === 'typescript') {
        lines.forEach((line, i) => {
            if (/:\s*any\b/.test(line)) {
                issues.push({
                    type: 'warning',
                    line: i + 1,
                    message: '`any` type used — defeats TypeScript\'s type safety.',
                    suggestion: 'Define a proper type or interface for better type checking.',
                });
            }
        });
    }
}

// ===== PYTHON ANALYSIS =====
function analyzePython(code, lines, issues) {
    // Indentation check
    lines.forEach((line, i) => {
        if (line.match(/^\t/) && code.includes('    ')) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'Mixed tabs and spaces for indentation.',
                suggestion: 'Use 4 spaces consistently for indentation (PEP 8).',
            });
        }
    });

    // Missing colons after if/for/while/def/class/elif/else/try/except/finally
    lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (/^(if|elif|else|for|while|def|class|try|except|finally|with)\b/.test(trimmed) &&
            !trimmed.endsWith(':') && !trimmed.endsWith(':\\') && !isComment(trimmed, 'py')) {
            // Check if it's a multiline statement
            if (!trimmed.endsWith('\\') && !trimmed.endsWith(',') && !trimmed.endsWith('(')) {
                issues.push({
                    type: 'error',
                    line: i + 1,
                    message: `Missing colon at end of \`${trimmed.split(/\s/)[0]}\` statement.`,
                    suggestion: 'Add a colon `:` at the end of the statement.',
                    fix: trimmed + ':'
                });
            }
        }
    });

    // Division by zero potential
    lines.forEach((line, i) => {
        if (/\/\s*0\b/.test(line) && !isComment(line, 'py')) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'Potential division by zero.',
                suggestion: 'Add a check to ensure the divisor is not zero.',
            });
        }
    });

    // Bare except
    lines.forEach((line, i) => {
        if (/^\s*except\s*:/.test(line)) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: 'Bare `except` clause — catches all exceptions.',
                suggestion: 'Specify the exception type, e.g., `except ValueError:`',
            });
        }
    });

    // Mutable default argument
    lines.forEach((line, i) => {
        if (/def\s+\w+\s*\(.*=\s*(\[\]|\{\})\s*[,)]/.test(line)) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'Mutable default argument detected — this is a common Python bug.',
                suggestion: 'Use `None` as default and initialize inside the function.',
                fix: 'def func(data=None):\n    if data is None:\n        data = []'
            });
        }
    });

    // print() with no parentheses (Python 2 style)
    lines.forEach((line, i) => {
        if (/^(\s*)print\s+[^(]/.test(line) && !isComment(line, 'py')) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'Print without parentheses — Python 2 syntax.',
                suggestion: 'Use `print()` function syntax for Python 3.',
            });
        }
    });

    // Unused imports (basic)
    const imports = [];
    lines.forEach((line, i) => {
        const match = line.match(/^\s*import\s+(\w+)/);
        const matchFrom = line.match(/^\s*from\s+\w+\s+import\s+(\w+)/);
        if (match) imports.push({ name: match[1], line: i + 1 });
        if (matchFrom) imports.push({ name: matchFrom[1], line: i + 1 });
    });

    imports.forEach(imp => {
        const regex = new RegExp(`\\b${imp.name}\\b`, 'g');
        const matches = code.match(regex);
        if (matches && matches.length === 1) {
            issues.push({
                type: 'warning',
                line: imp.line,
                message: `Import \`${imp.name}\` may be unused.`,
                suggestion: 'Remove unused imports to keep code clean.',
            });
        }
    });

    // Global variable usage
    lines.forEach((line, i) => {
        if (/^\s*global\s+/.test(line)) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: '`global` keyword used — can lead to hard-to-track bugs.',
                suggestion: 'Refactor to pass variables as parameters or use a class.',
            });
        }
    });

    // f-string with no expressions
    lines.forEach((line, i) => {
        if (/f['\"][^{}]*['\"]/.test(line) && !isComment(line, 'py')) {
            const fstrMatch = line.match(/f(['"])(.*?)\1/);
            if (fstrMatch && !fstrMatch[2].includes('{')) {
                issues.push({
                    type: 'info',
                    line: i + 1,
                    message: 'f-string without any embedded expressions.',
                    suggestion: 'Remove the `f` prefix or add expressions inside `{}`.',
                });
            }
        }
    });

    checkBrackets(code, lines, issues, ['{', '}'], ['[', ']'], ['(', ')']);
}

// ===== JAVA ANALYSIS =====
function analyzeJava(code, lines, issues) {
    // Missing semicolons
    lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (trimmed.length > 0 &&
            /[a-zA-Z0-9)\]"']$/.test(trimmed) &&
            !trimmed.startsWith('//') &&
            !trimmed.startsWith('/*') &&
            !trimmed.startsWith('*') &&
            !trimmed.endsWith('{') &&
            !trimmed.endsWith('}') &&
            !/^(if|else|for|while|do|switch|try|catch|finally|class|interface|enum|public|private|protected|import|package)\b/.test(trimmed)) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'Possible missing semicolon.',
                suggestion: 'Java statements must end with a semicolon `;`.',
            });
        }
    });

    // String comparison with ==
    lines.forEach((line, i) => {
        if (/"\w*"\s*==\s*\w|(\w)\s*==\s*"/.test(line) && !isComment(line, 'java')) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'String comparison using `==` — compares references, not values.',
                suggestion: 'Use `.equals()` method for string comparison in Java.',
            });
        }
    });

    // Catch generic Exception
    lines.forEach((line, i) => {
        if (/catch\s*\(\s*Exception\s/.test(line)) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: 'Catching generic `Exception` — too broad.',
                suggestion: 'Catch specific exception types for better error handling.',
            });
        }
    });

    // Null pointer potential
    lines.forEach((line, i) => {
        if (/\.\w+\(/.test(line) && /=\s*null/.test(code)) {
            // Simple check — flag potential
        }
    });

    // System.out.println
    lines.forEach((line, i) => {
        if (/System\.(out|err)\.(print|println)\s*\(/.test(line)) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: '`System.out.println` found — use a logging framework.',
                suggestion: 'Use Logger (java.util.logging) or SLF4J for production code.',
            });
        }
    });

    // Missing main method
    if (/class\s+\w+/.test(code) && !/public\s+static\s+void\s+main/.test(code)) {
        issues.push({
            type: 'info',
            line: '-',
            message: 'No `main` method found.',
            suggestion: 'Add `public static void main(String[] args)` for executable class.',
        });
    }

    checkBrackets(code, lines, issues, ['{', '}'], ['[', ']'], ['(', ')']);
}

// ===== C/C++ ANALYSIS =====
function analyzeCpp(code, lines, issues, lang) {
    // Missing semicolons
    lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (trimmed.length > 0 &&
            /[a-zA-Z0-9)\]"']$/.test(trimmed) &&
            !trimmed.startsWith('//') &&
            !trimmed.startsWith('/*') &&
            !trimmed.startsWith('*') &&
            !trimmed.startsWith('#') &&
            !trimmed.endsWith('{') &&
            !trimmed.endsWith('}') &&
            !/^(if|else|for|while|do|switch|class|struct|namespace)\b/.test(trimmed)) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'Possible missing semicolon.',
                suggestion: `${lang === 'cpp' ? 'C++' : 'C'} statements must end with ';'.`,
            });
        }
    });

    // Memory leak: malloc without free
    if (/\bmalloc\s*\(/.test(code) && !/\bfree\s*\(/.test(code)) {
        issues.push({
            type: 'error',
            line: '-',
            message: '`malloc()` used without corresponding `free()` — memory leak!',
            suggestion: 'Always free allocated memory with `free()` when done.',
        });
    }

    // new without delete (C++)
    if (lang === 'cpp' && /\bnew\s+\w/.test(code) && !/\bdelete\b/.test(code) && !/shared_ptr|unique_ptr/.test(code)) {
        issues.push({
            type: 'error',
            line: '-',
            message: '`new` used without `delete` — potential memory leak.',
            suggestion: 'Use smart pointers (`std::unique_ptr`, `std::shared_ptr`) instead.',
        });
    }

    // gets() usage (unsafe)
    lines.forEach((line, i) => {
        if (/\bgets\s*\(/.test(line)) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: '`gets()` is unsafe and removed in C11 — buffer overflow risk!',
                suggestion: 'Use `fgets()` instead for safe input reading.',
                fix: 'fgets(buffer, sizeof(buffer), stdin);'
            });
        }
    });

    // printf format string issues
    lines.forEach((line, i) => {
        const printfMatch = line.match(/printf\s*\(\s*"([^"]+)"/);
        if (printfMatch) {
            const formatCount = (printfMatch[1].match(/%[dfsclxXoupie]/g) || []).length;
            const argPart = line.substring(line.indexOf(printfMatch[0]) + printfMatch[0].length);
            const argCount = argPart.split(',').length - 1;
            if (formatCount !== argCount && argCount >= 0) {
                issues.push({
                    type: 'warning',
                    line: i + 1,
                    message: `printf format specifiers (${formatCount}) may not match arguments (${argCount}).`,
                    suggestion: 'Ensure each format specifier has a matching argument.',
                });
            }
        }
    });

    // Missing #include
    if (!/^\s*#include/.test(code) && (lang === 'c' || lang === 'cpp')) {
        issues.push({
            type: 'info',
            line: 1,
            message: 'No `#include` directives found.',
            suggestion: 'Add necessary headers (e.g., `#include <stdio.h>`).',
        });
    }

    checkBrackets(code, lines, issues, ['{', '}'], ['[', ']'], ['(', ')']);
}

// ===== HTML ANALYSIS =====
function analyzeHTML(code, lines, issues) {
    // Missing doctype
    if (!/<!DOCTYPE\s+html>/i.test(code)) {
        issues.push({
            type: 'error',
            line: 1,
            message: 'Missing `<!DOCTYPE html>` declaration.',
            suggestion: 'Add `<!DOCTYPE html>` at the beginning of the file.',
        });
    }

    // Missing title tag
    if (/<head>/.test(code) && !/<title>/.test(code)) {
        issues.push({
            type: 'warning',
            line: '-',
            message: 'Missing `<title>` tag in `<head>`.',
            suggestion: 'Add a descriptive `<title>` for SEO and accessibility.',
        });
    }

    // Missing alt attribute on images
    lines.forEach((line, i) => {
        if (/<img\b/.test(line) && !/\balt\s*=/.test(line)) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: '`<img>` tag missing `alt` attribute.',
                suggestion: 'Add descriptive alt text for accessibility.',
            });
        }
    });

    // Missing meta viewport
    if (/<head>/.test(code) && !/meta.*viewport/.test(code)) {
        issues.push({
            type: 'warning',
            line: '-',
            message: 'Missing viewport meta tag.',
            suggestion: 'Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">` for responsive design.',
        });
    }

    // Deprecated tags
    const deprecated = ['<font', '<center', '<marquee', '<blink', '<strike'];
    lines.forEach((line, i) => {
        deprecated.forEach(tag => {
            if (line.toLowerCase().includes(tag)) {
                issues.push({
                    type: 'warning',
                    line: i + 1,
                    message: `Deprecated HTML tag \`${tag}>\` used.`,
                    suggestion: 'Use CSS for styling instead of deprecated HTML tags.',
                });
            }
        });
    });

    // Inline styles
    lines.forEach((line, i) => {
        if (/style\s*=\s*"/.test(line)) {
            issues.push({
                type: 'info',
                line: i + 1,
                message: 'Inline style found.',
                suggestion: 'Move styles to an external CSS file for maintainability.',
            });
        }
    });

    // Unclosed tags (basic)
    const selfClosing = ['img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr'];
    const openTags = [];
    const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    let match;
    while ((match = tagRegex.exec(code)) !== null) {
        const tagName = match[1].toLowerCase();
        if (selfClosing.includes(tagName)) continue;
        if (match[0].startsWith('</')) {
            if (openTags.length > 0 && openTags[openTags.length - 1] === tagName) {
                openTags.pop();
            }
        } else if (!match[0].endsWith('/>')) {
            openTags.push(tagName);
        }
    }
    if (openTags.length > 0) {
        issues.push({
            type: 'error',
            line: '-',
            message: `Potentially unclosed tag(s): \`<${openTags.join('>, <')}>\``,
            suggestion: 'Ensure all HTML tags are properly closed.',
        });
    }
}

// ===== CSS ANALYSIS =====
function analyzeCSS(code, lines, issues) {
    // !important usage
    lines.forEach((line, i) => {
        if (/!important/.test(line)) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: '`!important` used — makes styles hard to override.',
                suggestion: 'Increase specificity instead of using !important.',
            });
        }
    });

    // Duplicate properties
    const blocks = code.split('}');
    blocks.forEach(block => {
        const props = {};
        const propLines = block.split('\n');
        propLines.forEach((line, i) => {
            const propMatch = line.match(/^\s*([\w-]+)\s*:/);
            if (propMatch) {
                if (props[propMatch[1]]) {
                    issues.push({
                        type: 'warning',
                        line: '-',
                        message: `Duplicate CSS property: \`${propMatch[1]}\``,
                        suggestion: 'Remove duplicate property declarations.',
                    });
                }
                props[propMatch[1]] = true;
            }
        });
    });

    // vendor prefixes without standard
    lines.forEach((line, i) => {
        if (/-(webkit|moz|ms|o)-/.test(line)) {
            issues.push({
                type: 'info',
                line: i + 1,
                message: 'Vendor prefix found — ensure standard property is also present.',
                suggestion: 'Add the unprefixed standard property for future compatibility.',
            });
        }
    });

    // Zero values with units
    lines.forEach((line, i) => {
        if (/:\s*0(px|em|rem|%|vh|vw)/.test(line)) {
            issues.push({
                type: 'info',
                line: i + 1,
                message: 'Zero value with unnecessary unit.',
                suggestion: 'Use `0` without units for cleaner code.',
            });
        }
    });

    checkBrackets(code, lines, issues, ['{', '}']);
}

// ===== PHP ANALYSIS =====
function analyzePHP(code, lines, issues) {
    // SQL injection
    lines.forEach((line, i) => {
        if (/\$_(GET|POST|REQUEST)\s*\[/.test(line) && /query|mysql|sql/i.test(line)) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'Potential SQL injection vulnerability!',
                suggestion: 'Use prepared statements with parameterized queries.',
            });
        }
    });

    // echo with unsanitized user input
    lines.forEach((line, i) => {
        if (/echo\s+.*\$_(GET|POST|REQUEST)/.test(line)) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'XSS vulnerability — echoing unsanitized user input.',
                suggestion: 'Use `htmlspecialchars()` to sanitize output.',
            });
        }
    });

    // Missing PHP opening tag
    if (!code.trim().startsWith('<?php') && !code.trim().startsWith('<?')) {
        issues.push({
            type: 'error',
            line: 1,
            message: 'Missing PHP opening tag `<?php`.',
            suggestion: 'Start PHP files with `<?php`.',
        });
    }

    // Deprecated mysql_ functions
    lines.forEach((line, i) => {
        if (/\bmysql_(connect|query|fetch|select_db)\b/.test(line)) {
            issues.push({
                type: 'error',
                line: i + 1,
                message: 'Deprecated `mysql_*` function used.',
                suggestion: 'Use `mysqli_*` or PDO for database operations.',
            });
        }
    });

    checkBrackets(code, lines, issues, ['{', '}'], ['[', ']'], ['(', ')']);
}

// ===== C# ANALYSIS =====
function analyzeCSharp(code, lines, issues) {
    // String concatenation in loops
    let inLoop = false;
    lines.forEach((line, i) => {
        if (/\b(for|while|foreach)\b/.test(line)) inLoop = true;
        if (inLoop && /\+\s*=?\s*"/.test(line)) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: 'String concatenation in a loop — poor performance.',
                suggestion: 'Use `StringBuilder` for string concatenation in loops.',
            });
        }
        if (line.includes('}')) inLoop = false;
    });

    // Console.WriteLine
    lines.forEach((line, i) => {
        if (/Console\.(Write|WriteLine)\s*\(/.test(line)) {
            issues.push({
                type: 'info',
                line: i + 1,
                message: '`Console.WriteLine` found — debug code.',
                suggestion: 'Use a proper logging framework for production.',
            });
        }
    });

    checkBrackets(code, lines, issues, ['{', '}'], ['[', ']'], ['(', ')']);
}

// ===== GO ANALYSIS =====
function analyzeGo(code, lines, issues) {
    // Unused error
    lines.forEach((line, i) => {
        if (/,\s*_\s*:?=/.test(line) || /err\s*=/.test(line)) {
            // Check if err is used
        }
        if (/,\s*err\s*:?=/.test(line)) {
            const nextLines = lines.slice(i + 1, i + 5).join('\n');
            if (!/err\s*!=\s*nil/.test(nextLines) && !/if\s+err/.test(nextLines)) {
                issues.push({
                    type: 'warning',
                    line: i + 1,
                    message: 'Error returned but may not be checked.',
                    suggestion: 'Always check errors in Go: `if err != nil { ... }`',
                });
            }
        }
    });

    // fmt.Println
    lines.forEach((line, i) => {
        if (/fmt\.(Print|Println|Printf)\s*\(/.test(line)) {
            issues.push({
                type: 'info',
                line: i + 1,
                message: '`fmt.Print*` found — consider using a logger.',
                suggestion: 'Use `log` package or a structured logger for production.',
            });
        }
    });

    // Missing package declaration
    if (!/^package\s+\w+/m.test(code)) {
        issues.push({
            type: 'error',
            line: 1,
            message: 'Missing `package` declaration.',
            suggestion: 'Every Go file must start with a package declaration.',
        });
    }

    checkBrackets(code, lines, issues, ['{', '}'], ['[', ']'], ['(', ')']);
}

// ===== RUBY ANALYSIS =====
function analyzeRuby(code, lines, issues) {
    // puts/p statements
    lines.forEach((line, i) => {
        if (/^\s*(puts|p)\s+/.test(line) && !isComment(line, 'ruby')) {
            issues.push({
                type: 'info',
                line: i + 1,
                message: '`puts`/`p` statement found — debug output.',
                suggestion: 'Use a logger for production code.',
            });
        }
    });

    // Missing end keyword check
    const openKeywords = (code.match(/\b(def|class|module|do|if|unless|while|until|for|case|begin)\b/g) || []).length;
    const endKeywords = (code.match(/\bend\b/g) || []).length;
    if (openKeywords > endKeywords) {
        issues.push({
            type: 'error',
            line: '-',
            message: `Missing \`end\` keyword(s). Found ${openKeywords} blocks but only ${endKeywords} \`end\`s.`,
            suggestion: 'Ensure every block-opening keyword has a matching `end`.',
        });
    }
}

// ===== RUST ANALYSIS =====
function analyzeRust(code, lines, issues) {
    // unwrap() usage
    lines.forEach((line, i) => {
        if (/\.unwrap\(\)/.test(line) && !isComment(line, 'rust')) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: '`.unwrap()` used — will panic on `None`/`Err`.',
                suggestion: 'Use `?` operator, `match`, or `.unwrap_or_default()` instead.',
            });
        }
    });

    // println! — just informational
    lines.forEach((line, i) => {
        if (/println!\s*\(/.test(line)) {
            issues.push({
                type: 'info',
                line: i + 1,
                message: '`println!` found — consider using `log` crate.',
                suggestion: 'Use structured logging for production applications.',
            });
        }
    });

    // unsafe block
    lines.forEach((line, i) => {
        if (/\bunsafe\b/.test(line) && !isComment(line, 'rust')) {
            issues.push({
                type: 'warning',
                line: i + 1,
                message: '`unsafe` block — bypasses Rust\'s safety guarantees.',
                suggestion: 'Minimize unsafe code and document why it\'s necessary.',
            });
        }
    });

    checkBrackets(code, lines, issues, ['{', '}'], ['[', ']'], ['(', ')']);
}

// ===== GENERIC ANALYSIS =====
function analyzeGeneric(code, lines, issues) {
    checkBrackets(code, lines, issues, ['{', '}'], ['[', ']'], ['(', ')']);

    // Empty lines at start/end
    if (lines[0].trim() === '') {
        issues.push({ type: 'info', line: 1, message: 'Empty line at the start of the file.', suggestion: 'Remove leading empty lines.' });
    }
}

// ===== UTILITY FUNCTIONS =====

function isComment(line, lang) {
    const trimmed = line.trim();
    if (lang === 'py' || lang === 'python' || lang === 'ruby') {
        return trimmed.startsWith('#');
    }
    return trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*');
}

function checkBrackets(code, lines, issues, ...pairs) {
    pairs.forEach(([open, close]) => {
        let count = 0;
        // Remove strings and comments for counting
        const cleaned = code.replace(/(["'`])(?:(?!\1|\\).|\\.)*\1/g, '""')
            .replace(/\/\/.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/#.*$/gm, '');
        for (const char of cleaned) {
            if (char === open) count++;
            if (char === close) count--;
        }
        if (count > 0) {
            issues.push({
                type: 'error',
                line: '-',
                message: `Unmatched \`${open}\` — missing ${count} closing \`${close}\`.`,
                suggestion: 'Add the missing closing bracket.',
            });
        } else if (count < 0) {
            issues.push({
                type: 'error',
                line: '-',
                message: `Unmatched \`${close}\` — ${Math.abs(count)} extra closing bracket(s).`,
                suggestion: 'Remove the extra closing bracket or add the missing opening bracket.',
            });
        }
    });
}

function displayResults(issuesList) {
    const resultsList = document.getElementById('resultsList');
    const errorCount = document.getElementById('errorCount');
    const warningCount = document.getElementById('warningCount');
    const infoCount = document.getElementById('infoCount');
    const successBadge = document.getElementById('successBadge');

    const errors = issuesList.filter(i => i.type === 'error').length;
    const warnings = issuesList.filter(i => i.type === 'warning').length;
    const infos = issuesList.filter(i => i.type === 'info').length;

    errorCount.textContent = errors;
    warningCount.textContent = warnings;
    infoCount.textContent = infos;

    if (errors === 0 && warnings === 0) {
        successBadge.style.display = 'flex';
    } else {
        successBadge.style.display = 'none';
    }

    resultsList.innerHTML = '';

    issuesList.forEach((issue, idx) => {
        const item = document.createElement('div');
        item.className = `result-item ${issue.type}`;
        item.dataset.type = issue.type;
        item.style.animationDelay = `${idx * 0.08}s`;

        let html = `
            <div class="result-header">
                <span class="result-type">${issue.type === 'error' ? '✕ Error' : issue.type === 'warning' ? '⚠ Warning' : 'ⓘ Info'}</span>
                <span class="result-line">${issue.line !== '-' ? 'Line ' + issue.line : 'General'}</span>
            </div>
            <div class="result-message">${issue.message}</div>
        `;

        if (issue.suggestion) {
            html += `
                <div class="result-suggestion">
                    <i class="fas fa-lightbulb"></i>
                    <span>${issue.suggestion}</span>
                </div>
            `;
        }

        if (issue.fix) {
            html += `<div class="result-code">💡 Suggested fix: ${escapeHtml(issue.fix)}</div>`;
        }

        item.innerHTML = html;
        resultsList.appendChild(item);
    });
}

function filterResults(type) {
    const items = document.querySelectorAll('.result-item');
    items.forEach(item => {
        if (type === 'all' || item.dataset.type === type.replace('s', '')) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function resetResults() {
    const resultsList = document.getElementById('resultsList');
    const resultsSummary = document.getElementById('resultsSummary');
    resultsList.innerHTML = `
        <div class="empty-state" id="emptyState">
            <div class="empty-icon"><i class="fas fa-code"></i></div>
            <h3>Ready to Debug</h3>
            <p>Paste your code and click "Analyze Code" to see results here.</p>
        </div>
    `;
    resultsSummary.style.display = 'none';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== SAMPLE CODE =====
function getSampleCode(lang) {
    const samples = {
        javascript: `// JavaScript Sample with Bugs
var name = "John";
var age = 25;

function greet(person) {
    if (person == null) {
        alert("No person found!")
    }
    
    console.log("Hello, " + person);
    
    eval("var x = 1");
    
    document.getElementById("output").innerHTML = person;
    
    return "Welcome!";
    console.log("This line is unreachable");
}

function greet(name) {
    return "Hi, " + name;
}

async function fetchData() {
    const response = await fetch("/api/data");
    const data = await response.json();
    return data;
}`,

        python: `# Python Sample with Bugs
import os
import json

def calculate_average(numbers, cache=[]):
    total = 0
    for i in range(len(numbers))
        total += numbers[i]
    
    average = total / 0
    
    global result
    result = average
    
    print "The average is: " + str(average)
    
    name = f"hello"
    
    try:
        data = json.loads('{}')
    except:
        pass
    
    return average

# TODO: Fix this function later
calculate_average([10, 20, 30])`,

        java: `// Java Sample with Bugs
public class Main {
    public static void main(String[] args) {
        String name = "Hello"
        String greeting = "World"
        
        if (name == "Hello") {
            System.out.println("Match found!");
        }
        
        try {
            int result = 10 / 0;
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,

        cpp: `// C++ Sample with Bugs
#include <iostream>
using namespace std;

int main() {
    int* ptr = new int(42);
    cout << *ptr << endl
    
    char buffer[10];
    gets(buffer);
    
    int* arr = (int*)malloc(sizeof(int) * 10);
    
    printf("Value: %d %s", 42);
    
    return 0;
}`,

        c: `// C Sample with Bugs
#include <stdio.h>
#include <stdlib.h>

int main() {
    char buffer[10];
    gets(buffer);
    
    int* arr = (int*)malloc(sizeof(int) * 10);
    
    printf("Values: %d %d %s", 42);
    
    return 0
}`,

        html: `<html>
<head>
    <style>color: red;</style>
</head>
<body>
    <center>
        <h1>Welcome</h1>
    </center>
    <img src="photo.jpg">
    <font size="5">Hello World</font>
    <marquee>Scrolling text</marquee>
    <div style="color: red; font-size: 16px;">
        Inline styled content
    </div>
</body>
</html>`,

        css: `/* CSS Sample with Issues */
.container {
    width: 100%;
    margin: 0px;
    padding: 0rem;
    display: flex;
    display: grid;
    -webkit-transform: rotate(45deg);
    color: red !important;
    background: blue !important;
}

.header {
    font-size: 0em;
    margin: 0vh;
}`,

        php: `<?php
// PHP Sample with Bugs
$name = $_GET['name'];
echo $name;

$conn = mysql_connect("localhost", "root", "");
$result = mysql_query("SELECT * FROM users WHERE name = '" . $_POST['name'] . "'");

echo $_REQUEST['data'];
?>`,

        csharp: `// C# Sample with Issues
using System;

class Program {
    static void Main() {
        Console.WriteLine("Starting...");
        
        string result = "";
        for (int i = 0; i < 1000; i++) {
            result += "item " + i;
        }
        
        Console.WriteLine(result);
    }
}`,

        go: `package main

import "fmt"

func main() {
    result, err := doSomething()
    fmt.Println(result)
    
    data, err := loadFile("test.txt")
    fmt.Printf("Data: %v\\n", data)
}

func doSomething() (string, error) {
    return "hello", nil
}

func loadFile(name string) ([]byte, error) {
    return nil, nil
}`,

        ruby: `# Ruby Sample with Issues
class Calculator
  def add(a, b)
    puts "Adding #{a} and #{b}"
    a + b
  
  def subtract(a, b)
    p "Subtracting"
    a - b
  end
end`,

        rust: `// Rust Sample with Issues
fn main() {
    let data: Option<i32> = Some(42);
    let value = data.unwrap();
    
    println!("Value: {}", value);
    
    unsafe {
        let raw_ptr = &value as *const i32;
        println!("Raw: {}", *raw_ptr);
    }
    
    let result: Result<i32, String> = Ok(100);
    let num = result.unwrap();
}`,

        kotlin: `// Kotlin Sample
fun main() {
    val name: String? = null
    println(name!!.length)
    
    val list = mutableListOf(1, 2, 3)
    for (item in list) {
        println(item)
    }
}`,

        swift: `// Swift Sample
import Foundation

func processData() {
    let value: Int? = nil
    print(value!)
    
    let array = [1, 2, 3]
    for i in 0...array.count {
        print(array[i])
    }
}

processData()`,

        typescript: `// TypeScript Sample with Issues
interface User {
    name: string;
    age: any;
}

var users: any[] = [];

function getUser(id: any): any {
    const user = users.find(u => u.id == id);
    
    console.log("Found user:", user);
    
    eval("return user");
    
    return user;
}

async function fetchUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
}`
    };
    return samples[lang] || samples.javascript;
}

// ===== ABOUT SECTION =====
function initAbout() {
    document.querySelectorAll('.copy-contact').forEach(btn => {
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(btn.dataset.copy);
            showToast('Copied: ' + btn.dataset.copy);
        });
    });
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .about-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
}
