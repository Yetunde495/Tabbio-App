import AboutPage from "./AboutUs";
import AffiliatePage from "./Affiliate";
import CareerPage from "./Careers";
import CompanyLandingpage from "./CompanyLanding";
import ContactPage from "./ContactPage";
import LiveResume from "./LiveResume";
import OnboardUserWithResume from "./OnboardUserWithResume";
import PricingPage from "./Pricing";
import ProfessionalLandingpage from "./ProfessionalLanding";
import SmartResume from "./SmartResume";

function Index() {}



Index.ProfessionalLanding = ProfessionalLandingpage;
Index.CompanyLanding = CompanyLandingpage;
Index.OnboardUserWithResume = OnboardUserWithResume;
Index.SmartResume = SmartResume;
Index.LiveResume = LiveResume;
Index.AboutUs = AboutPage;
Index.ContactUs = ContactPage;
Index.Careers = CareerPage;
Index.Affiliate = AffiliatePage;
Index.Pricing = PricingPage;


export default Index;