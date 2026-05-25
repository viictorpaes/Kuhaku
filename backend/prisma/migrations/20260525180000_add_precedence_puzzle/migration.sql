DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM pg_enum e
		JOIN pg_type t ON t.oid = e.enumtypid
		WHERE t.typname = 'GameType' AND e.enumlabel = 'PRECEDENCE_PUZZLE'
	) THEN
		ALTER TYPE "GameType" ADD VALUE 'PRECEDENCE_PUZZLE';
	END IF;
END
$$;
