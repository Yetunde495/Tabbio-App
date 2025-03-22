import Applications from "./Applications";
import EditApplication from "./Applications/EditApplication";
import ProfilePreview from "./PreviewProfile";
import Profile from "./Profile";
import CreateNewResume from "./Resume/CreateNewResume";
import CreateResumeFromScratch from "./Resume/CreateResumeFromScratch";
import EditResume from "./Resume/EditResume";
import CreateSmartCV from "./SmartCV/CreateSmartCV";
import EditSmartCV from "./SmartCV/EditSmartCV";


function Index() {}
Index.Profile = Profile;
Index.Applications  = Applications;
Index.CreateSmartCV = CreateSmartCV;
Index.CreateLiveResume = CreateNewResume;
Index.CreateResumeFromScratch = CreateResumeFromScratch;
Index.EditSmartResume = EditSmartCV;
Index.ProfilePreview = ProfilePreview;
Index.EditCV = EditResume;
Index.EditApplication = EditApplication;

export default Index;