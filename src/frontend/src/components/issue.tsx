import { TSelectIssue } from "../../../backend/shared/schemas/issue";

export function Issue({ issue }: { issue: TSelectIssue }) {
  return (
    <div className="my-10 px-8 py-6 border border-opacity-55 border-gray-100 rounded-xl space-y-4 relative">
      <IssueBadges isPrivate={Boolean(issue.userId)} />
      <p className="font-semibold text-2xl">{issue.title}</p>
      <p className="font-thin text-md italic">{issue.description}</p>
    </div>
  );
}

function IssueBadges({ isPrivate }: { isPrivate: boolean }) {
  return (
    <div className="absolute left-4 -top-3 space-x-2">
      {isPrivate ? (
        <div className="badge badge-secondary badge-lg py-2 px-4">Private</div>
      ) : (
        <div className="badge badge-primary badge-lg py-2 px-4">Public</div>
      )}
    </div>
  );
}
