export default function getUserInitials(firstName: string, lastName: string) {
    if (!firstName && !lastName) {
        return '';
    }
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
}

export function generateResumeTitle(name: string, role: string): any {
    if (!name || !name.trim() || !role || !role.trim() || name === "Your Name" || role === "Professional Role") {
        return;
    }

    const [firstName, lastName] = name.split(' ');
    if (!firstName || !lastName) {
        return;
    }

    const uniqueSuffix = Math.floor(100 + Math.random() * 900);
    return `${firstName}_${lastName}_${role.replace(/\s+/g, '_')}_${uniqueSuffix}`;
}
  


