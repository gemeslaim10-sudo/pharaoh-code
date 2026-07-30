export function sanitizeInput(input: string, maxLength: number = 1000): string {
    if (!input) return '';
    // Prevent extremely large payloads
    const truncated = input.slice(0, maxLength);
    // Basic sanitization: remove potential script tags although React handles XSS
    return truncated.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
