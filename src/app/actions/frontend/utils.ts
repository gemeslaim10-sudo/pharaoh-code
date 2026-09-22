export function sanitizeInput(input: unknown, maxLength: number = 1000): string {
    if (typeof input !== 'string') return '';
    // Prevent extremely large payloads
    const truncated = input.trim().slice(0, maxLength);
    // Basic sanitization: remove potential script tags although React handles XSS
    return truncated.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
