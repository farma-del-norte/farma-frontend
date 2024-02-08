import { useState } from 'react';
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ExpandedContent = ({label, children}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Accordion 
            expanded={expanded} 
            onChange={() => setExpanded(!expanded)}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography sx={{fontSize: "1.25rem", textAlign: 'center'}}>{label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}