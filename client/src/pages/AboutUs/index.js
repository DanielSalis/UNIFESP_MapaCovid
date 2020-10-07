import React from 'react';
import {
    Container,
    InfoContainer,
    InfoContainerRight,
    DesciptionContainer,
    TechnologiesContainer,
    TechSubItem,
    TeamContainer
} from './style';

import { SiNotion, SiTrello, SiVisualstudiocode, SiReact, SiGithub, SiHeroku } from 'react-icons/si'
import { FiFigma } from 'react-icons/fi';
import { DiNodejs, DiPostgresql } from 'react-icons/di';
import { BiMap } from 'react-icons/bi';
import img from '../../assets/coding.jpg'

const AboutUs = props => {
    return (
        <Container>
            <DesciptionContainer>
                <h3>Um pouco sobre nós</h3>
                <h2>Estudantes da Universidade Federal de São Paulo e
                marinheiros de primeira viagem no mundo do desenvolvimento web.
                </h2>
            </DesciptionContainer>

            <InfoContainer>
                <img src={img} />
                <InfoContainerRight>
                    <h3>Quem somos?</h3>
                    <p>Grupo de amigos que se juntou para implementar <b>do zero</b> o projeto que chamamos de Mapa Covid, destinado à disciplina de Cidades Inteligentes.</p>
                    <p>Devido a pandemia causada pelo Covid-19 nós nos motivamos a realizar o projeto com o intuito de divulgar a quantidade de casos no pais de uma maneira simples e interativa.</p>
                    <p></p>
                </InfoContainerRight>
            </InfoContainer>

            <h3>Nossas Ferramentas</h3>
            <TechnologiesContainer>
                <TechSubItem>
                    <label>Planejamento</label>
                    <div>
                        <SiNotion size={'3rem'} color='#fff' />
                        <SiTrello size={'3rem'} color='#fff' />
                    </div>
                </TechSubItem>
                <span>{`- - - -`}</span>

                <TechSubItem>
                    <label>Prototipagem</label>
                    <div>
                        <FiFigma size={'3rem'} color='#fff' />
                    </div>
                </TechSubItem>
                <span>{`- - - -`}</span>

                <TechSubItem>
                    <label>Dev</label>
                    <div>
                        <SiVisualstudiocode size={'3rem'} color='#fff' />
                        <SiGithub size={'3rem'} color='#fff' />
                    </div>
                </TechSubItem>
                <span>{`- - - -`}</span>

                <TechSubItem>
                    <label>Linguagens</label>
                    <div>
                        <SiReact size={'3rem'} color='#fff' />
                        <DiNodejs size={'3rem'} color='#fff' />
                    </div>
                </TechSubItem>
                <span>{`- - - -`}</span>

                <TechSubItem>
                    <label>Banco</label>
                    <div>
                        <DiPostgresql size={'3rem'} color='#fff' />
                    </div>
                </TechSubItem>
                <span>{`- - - -`}</span>

                <TechSubItem>
                    <label>Openlayers</label>
                    <div>
                        <BiMap size={'3rem'} color='#fff' />
                    </div>
                </TechSubItem>
                <span>{`- - - -`}</span>

                <TechSubItem>
                    <label>Deploy</label>
                    <div>
                        <SiHeroku size={'3rem'} color='#fff' />
                    </div>
                </TechSubItem>
            </TechnologiesContainer>

            <h3>A Equipe</h3>
            <TeamContainer>
                <div>
                    <label>Daniel Salis</label>
                    <p></p>
                    <span>Email: daniel.salis@unifesp.br</span>
                    <span>GitHub: DanielSalis</span>
                </div>

                <div>
                    <label>Milena Matos</label>
                    <p></p>
                    <span>Email: milena.matos@unifesp.br</span>
                    <span>GitHub: MilenaMatos</span>
                </div>

                <div>
                    <label>Leonardo Luciano</label>
                    <p></p>
                    <span>Email: leonardo.luciano@unifesp.br</span>
                    <span>GitHub: Leolucianox</span>
                </div>
            </TeamContainer>

        </Container>
    );
}

export default AboutUs;