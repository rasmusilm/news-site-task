export default function representUnknown(value: string | null): string {
    if (value) {
        return value;
    }
    return "Unknown"
}