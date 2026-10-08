import BucketList from "./BucketList";
import CreateBucket from "./CreateBucket";

const Library = () => {
  return (
    <div className="space-y-8">
      <CreateBucket />
      <BucketList />
    </div>
  );
};

export default Library;
