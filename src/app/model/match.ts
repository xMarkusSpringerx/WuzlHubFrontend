import {Team} from "./team";
export class Match {
  id?: number;

  tournamentId?: number;

  team1?: Team;

  team2?: Team;

  startDateTime?: Date;

  hasEnded?: boolean;

  goalsTeam1?: number;

  goalsTeam2?: number;
}
