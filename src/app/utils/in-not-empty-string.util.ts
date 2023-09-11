export const isNotEmptyStringUtil = (context: unknown): context is string => typeof context === 'string' && !!context.trim()
