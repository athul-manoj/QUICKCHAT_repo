// File: client/src/components/GenderCheckbox.tsx

interface GenderCheckboxProps {
    onGenderChange: (gender: string) => void;
    selectedGender: string;
}

const GenderCheckbox = ({ onGenderChange, selectedGender }: GenderCheckboxProps) => {
	return (
		<div className='flex mt-2'>
			{/* Male Checkbox */}
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
					<span className='label-text'>Male</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedGender === "male"}
						onChange={() => onGenderChange("male")}
					/>
				</label>
			</div>
            
			{/* Female Checkbox */}
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""} `}>
					<span className='label-text'>Female</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedGender === "female"}
						onChange={() => onGenderChange("female")}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;