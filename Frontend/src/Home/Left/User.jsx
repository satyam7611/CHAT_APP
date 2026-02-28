
import Users from "./Users";
const User = () => {
  return (
    <div className="overflow-y-auto" style={{height:"calc(100vh)"}}>
           <Users name="Satyam" email="satyam@gmail.com" />
           <Users name="Anshu" email="anshu@gmail.com" />
           <Users name="Aniket" email="aniket@gmail.com"/>
           <Users name="Sourya" email="sourya@gmail.com"/>
           <Users name="Vikas" email="vikas@gmail.com" />
           <Users name="Shivam" email="shivam@gmail.com"/>
           <Users name="Shreyanshu" email="shreyanshu@gmail.com"/>
           <Users name="Himanshu" email="himanshu@gmail.com"/>
           <Users name="Gaurav" email='gaurav@gmail.com'/>
    
    </div>
  
  );
};

export default User;
