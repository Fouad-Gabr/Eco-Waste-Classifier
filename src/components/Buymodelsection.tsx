import { BuyButton } from '../components/BuyButton';

export const ModelSection: React.FC = () => {
  return (
    <section  style={{
  display: 'flex',
  flexDirection: 'row',       // flex-col
  alignItems: 'center',          // items-center
  justifyContent: 'center', // justify-between
  backgroundColor: 'white',      // bg-white
  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', // shadow-lg تقريبا
  borderRadius: '1rem',          // rounded-2xl (16px)
  padding: '1.5rem',             // p-6 (24px)
  marginTop: '2.5rem',           // mt-10 (40px)
  marginLeft: 'auto',            // mx-auto (left)
  marginRight: 'auto',           // mx-auto (right)
  maxWidth: '80rem',             // max-w-5xl (1280px)
}}>
      {/* صورة */}
      <div   style={{
    width: 'fit-content',
    maxWidth: '50%',   // بدل md:w-1/2 يعني نص العرض للشاشات الكبيرة
    borderRadius: '0.75rem', // rounded-xl تقريبا 12px
    marginBottom: '1rem',   // mb-4 يعني 16px
  }}>
         <img
        src="../../images/bg3.png"   
        alt="AI Model"
        className=""
        style={{
          width: '50%', // rounded-xl تقريبا 12px
        }}
      />
      </div>
     

      {/* الزرار */}
      <div className="md:ml-6 text-center md:text-left">
        <h2 className="text-2xl font-bold mb-4">Unlock Full Model Access</h2>
        <p className="text-gray-600 mb-4">
          Get full access to our advanced waste classifier model for just $10.
        </p>
        <BuyButton />
      </div>
    </section>
  );
};
