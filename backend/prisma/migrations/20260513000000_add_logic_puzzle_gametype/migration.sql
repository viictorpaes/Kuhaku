DO $$
BEGIN
	-- Alguns ambientes ficaram sem a migration que criou GameType/gameType.
	-- Garante o estado base antes de adicionar o novo valor.
	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'GameType') THEN
		CREATE TYPE "GameType" AS ENUM ('NUMBER_GUESS', 'VS_GUESS', 'CARD_GUESS');
	END IF;

	IF NOT EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_name = 'Game' AND column_name = 'gameType'
	) THEN
		ALTER TABLE "Game"
			ADD COLUMN "gameType" "GameType" NOT NULL DEFAULT 'NUMBER_GUESS';
	END IF;

	IF NOT EXISTS (
		SELECT 1
		FROM pg_enum e
		JOIN pg_type t ON t.oid = e.enumtypid
		WHERE t.typname = 'GameType' AND e.enumlabel = 'LOGIC_PUZZLE'
	) THEN
		ALTER TYPE "GameType" ADD VALUE 'LOGIC_PUZZLE';
	END IF;
END
$$;
