export const isNotEmptyString = (context: unknown): context is string => typeof context === 'string' && !!context.trim()
