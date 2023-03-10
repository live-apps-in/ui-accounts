import { FlexColumn } from "src/components";
import { ACCOUNT_SESSIONS } from "src/model";
import { styled } from "src/utils";
import { SessionCard } from "./session-card";

const StyledSessionsContiner = styled(FlexColumn)`
  width: 100%;
  padding-top: 20px;
`;

export const Sessions: React.FC<
  { sessions: ACCOUNT_SESSIONS } & { toggleSessions: Function }
> = ({ sessions, toggleSessions }) => {
  return (
    <StyledSessionsContiner>
      {sessions.map((el) => (
        <>
          <SessionCard {...el} key={el.email} />
        </>
      ))}
      <SessionCard isAddAccount toggleSessions={toggleSessions} />
    </StyledSessionsContiner>
  );
};
